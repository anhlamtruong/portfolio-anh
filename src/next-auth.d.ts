import { type DefaultSession } from "next-auth";
import { UserRole } from "./generated/@prisma-client-authenticate";
export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  storeIds: string[];
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: ExtendedUser; // To keep the default types
  }
}

// import { JWT } from "next-auth/jwt";

// declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
//   interface JWT {
//     /** OpenID ID Token */
//     role?: UserRole;
//   }
// }
