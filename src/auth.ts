// import NextAuth from "next-auth";
// import authConfig from "@/auth.config";
// import prismaAuthenticate from "@/services/authenticate-service/lib/authenticate_db";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { getUserById } from "@/services/authenticate-service/data/user";
// import { getTwoFactorConfirmationByUserId } from "@/services/authenticate-service/data/two_factor_confirmation";
// import { getAccountByUserId } from "@/services/authenticate-service/data/account";
// import { UserRole } from "@/services/authenticate-service/generated/authenticate/@prisma-authenticate";

// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { db } from "./services/firebase/service-provider";
// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
//   update,
// } = NextAuth({
//   pages: {
//     signIn: "/auth/login",
//     error: "/auth/error",
//   },
//   events: {
//     async linkAccount({ user }) {
//       await prismaAuthenticate.user.update({
//         where: { id: user.id },
//         data: { emailVerified: new Date() },
//       });
//     },
//   },
//   callbacks: {
//     async signIn({ user, account }) {
//       // Allow OAuth without email verification

//       if (account?.provider !== "credentials") {
//         const existingUser = await getUserById(user.id);
//         try {
//           const userDocRef = doc(db, "users", existingUser?.id ?? "");

//           const userDocSnap = await getDoc(userDocRef);

//           if (!userDocSnap.exists()) {
//             await setDoc(userDocRef, {
//               ingredients: [],
//             });
//             console.info("User document created in Firebase"); // For debugging
//           }
//         } catch (error) {
//           console.error("Error checking or creating Firebase document:", error);
//         }
//         return true;
//       }

//       const existingUser = await getUserById(user.id);
//       // Prevent sign in without email verification
//       if (!existingUser?.emailVerified) {
//         return false;
//       }

//       if (existingUser.isTwoFactorEnabled) {
//         const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
//           existingUser.id
//         );
//         if (!twoFactorConfirmation) return false;

//         // Delete two factor confirmation for next sign in
//         await prismaAuthenticate.twoFactorConfirmation.delete({
//           where: { id: twoFactorConfirmation.id },
//         });
//       }
//       try {
//         const userDocRef = doc(db, "users", existingUser.id);

//         const userDocSnap = await getDoc(userDocRef);

//         if (!userDocSnap.exists()) {
//           await setDoc(userDocRef, {
//             ingredients: [],
//           });
//           console.info("User document created in Firebase"); // For debugging
//         }
//       } catch (error) {
//         console.error("Error checking or creating Firebase document:", error);
//       }

//       return true;
//     },
//     async session({ token, session }) {
//       // if (token.sub && session.user) {
//       //   session.user.id = token.sub;
//       // }
//       if (token.role && session.user) {
//         session.user.role = token.role as UserRole;
//       }
//       if (token.isTwoFactorEnabled && session.user) {
//         session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
//       }
//       // if (token.cookitStore && session.user) {
//       //   session.user.storeIds = token.storeIds as String[];
//       // }
//       if (session.user) {
//         session.user.name = token.name;
//         session.user.email = token.email;
//         session.user.isOAuth = token.isOAuth as boolean;
//       }

//       return session;
//     },
//     async jwt({ token }) {
//       if (!token.sub) return token;

//       const existingUser = await getUserById(token.sub);
//       if (!existingUser) return token;
//       const existingAccount = await getAccountByUserId(existingUser.id);

//       token.isOAuth = !!existingAccount;
//       token.name = existingUser.name;
//       token.email = existingUser.email;
//       token.role = existingUser.role;
//       token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

//       return token;
//     },
//   },
//   adapter: PrismaAdapter(prismaAuthenticate),
//   session: { strategy: "jwt" },
//   ...authConfig,
// });

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebase/service-provider";
import { authConfig } from "@/auth.config";

import prismaAuthenticate from "@/services/authenticate-service/lib/authenticate_db";
import { getUserById } from "@/services/authenticate-service/data/user";
import { getTwoFactorConfirmationByUserId } from "@/services/authenticate-service/data/two_factor_confirmation";
import { getAccountByUserId } from "@/services/authenticate-service/data/account";
import { UserRole } from "@/services/authenticate-service/generated/authenticate/@prisma-authenticate";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prismaAuthenticate.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await getUserById(user.id);

      if (account?.provider !== "credentials") {
        try {
          const ref = doc(db, "users", existingUser?.id ?? "");
          const snap = await getDoc(ref);
          if (!snap.exists()) await setDoc(ref, { ingredients: [] });
        } catch (err) {
          console.error("Firebase error:", err);
        }
        return true;
      }

      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const confirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        if (!confirmation) return false;
        await prismaAuthenticate.twoFactorConfirmation.delete({
          where: { id: confirmation.id },
        });
      }

      try {
        const ref = doc(db, "users", existingUser.id);
        const snap = await getDoc(ref);
        if (!snap.exists()) await setDoc(ref, { ingredients: [] });
      } catch (err) {
        console.error("Firebase error:", err);
      }

      return true;
    },
    async session({ token, session }) {
      if (session.user) {
        session.user.role = token.role as UserRole;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);
      if (!user) return token;

      const account = await getAccountByUserId(user.id);

      token.isOAuth = !!account;
      token.name = user.name;
      token.email = user.email;
      token.role = user.role;
      token.isTwoFactorEnabled = user.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(prismaAuthenticate),
  session: { strategy: "jwt" },
  ...authConfig,
});
