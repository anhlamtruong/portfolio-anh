import { auth } from "@/auth";
import { initTRPC } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";
import { ExtendedUser } from "@/next-auth.d";
import { FirebasePublicCreataClient } from "../_service/firebase_public_creata_service";
import { FirebasePrivateCreataClient } from "../_service/firebase_private_creata_service";

export type Context = {
  user: ExtendedUser | null | undefined;
  public_firebase_service: FirebasePublicCreataClient;
  private_firebase_service: FirebasePrivateCreataClient | null;
};

export const createTRPCContext = cache(async (): Promise<Context> => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  const session = await auth();

  return {
    user: session?.user ?? null,
    public_firebase_service: new FirebasePublicCreataClient(),
    private_firebase_service: new FirebasePrivateCreataClient(),
  };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.

const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

/**
 * Unprotected procedure
 */
export const publicProcedure = t.procedure;

/**
 * Protected procedure
 */
export const authedProcedure = t.procedure.use(async (opts) => {
  return opts.next({
    ctx: {
      user: opts.ctx.user,
      public_firebase_service: opts.ctx.public_firebase_service,
      private_firebase_service: opts.ctx.private_firebase_service,
    },
  });
});
