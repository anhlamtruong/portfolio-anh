import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import prismaAuthenticate from "@/services/authenticate-service/lib/authenticate_db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "@/services/authenticate-service/data/user";
import { getTwoFactorConfirmationByUserId } from "@/services/authenticate-service/data/two_factor_confirmation";
import { getAccountByUserId } from "@/services/authenticate-service/data/account";
import { UserRole } from "@/services/authenticate-service/generated/authenticate/@prisma-authenticate";
import {
  ensureFirestoreUserDoc,
  FirestoreUserPayload,
} from "@/services/firebase/utils/firestore-utils";
import { LoginSchema } from "@/services/authenticate-service/schemas";
import { getUserByEmail } from "@/services/authenticate-service/data/user";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Export NextAuth handlers and helpers
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  // Custom pages for sign in and error
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  // Event hooks for NextAuth
  events: {
    // When an account is linked, update emailVerified in the database
    async linkAccount({ user }) {
      await prismaAuthenticate.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    // Callback for sign in attempts
    async signIn({ user, account }) {
      // OAuth or credential-based sign-in
      if (account?.provider !== "credentials") {
        return true;
      }
      const existing = await getUserById(user.id!);
      if (!existing) return false;

      // Credential sign-in: enforce email verification
      if (!existing.emailVerified) return false;

      // Handle two-factor authentication
      if (existing.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existing.id
        );
        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        await prismaAuthenticate.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }
      await ensureFirestoreUserDoc(existing);
      return true;
    },
    // Callback to augment session object
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (token.isTwoFactorEnabled && session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email ?? "";
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    // Callback to augment JWT token
    async jwt({ token, user, account }) {
      //TODO: Handle Syncing Change between Firebase and Prisma Authentication
      //TODO: When Account in Prisma changed, update Firestore User Document, and the opposite
      if (account && user) {
        ensureFirestoreUserDoc(user as FirestoreUserPayload).catch(
          console.error
        );
        token.sub = user.id;
        token.role = (user as any).role;
        token.isTwoFactorEnabled = (user as any).isTwoFactorEnabled;
        token.name = user.name;
        token.email = user.email;
        token.isOAuth = true;
        return token;
      }
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  // Use Prisma adapter for NextAuth
  adapter: PrismaAdapter(prismaAuthenticate),
  // Use JWT session strategy
  session: { strategy: "jwt" },
  // Spread in additional auth config
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],

  // Auth secret from environment
  secret: process.env.AUTH_SECRET,
});
// Export update function for session
export const update = unstable_update;
