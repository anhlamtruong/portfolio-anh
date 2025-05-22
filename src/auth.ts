import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import prismaAuthenticate from "@/services/authenticate-service/lib/authenticate_db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "@/services/authenticate-service/data/user";
import { getTwoFactorConfirmationByUserId } from "@/services/authenticate-service/data/two_factor_confirmation";
import { getAccountByUserId } from "@/services/authenticate-service/data/account";
import { UserRole } from "@/services/authenticate-service/generated/authenticate/@prisma-authenticate";
import { ensureFirestoreUserDoc } from "@/services/firebase/utils/firestore-utils";

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
      const existing = await getUserById(user.id!);
      if (!existing) return false;

      if (account?.provider !== "credentials") {
        // On OAuth, fire-and-forget Firestore sync
        ensureFirestoreUserDoc(existing).catch(console.error);
        return true;
      }

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
    async jwt({ token }) {
      if (!token.sub) return token;

      const existing = await getUserById(token.sub);
      if (!existing) return token;
      const existingAccount = await getAccountByUserId(existing.id);

      token.isOAuth = !!existingAccount;
      token.name = existing.name;
      token.email = existing.email;
      token.role = existing.role;
      token.isTwoFactorEnabled = existing.isTwoFactorEnabled;

      return token;
    },
  },
  // Use Prisma adapter for NextAuth
  adapter: PrismaAdapter(prismaAuthenticate),
  // Use JWT session strategy
  session: { strategy: "jwt" },
  // Spread in additional auth config
  ...authConfig,
  // Auth secret from environment
  secret: process.env.AUTH_SECRET,
});
// Export update function for session
export const update = unstable_update;
