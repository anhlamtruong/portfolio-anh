import { auth } from "@/auth";
import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";
import { ExtendedUser } from "@/next-auth.d";

export const createTRPCContext = cache(async (): Promise<Context> => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  const session = await auth();
  return {
    user: session?.user ?? null,
  };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.

export type Context = {
  user: ExtendedUser | null | undefined;
};
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;
export const authedProcedure = t.procedure.use(async (opts) => {
  if (!opts.ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({ ctx: { user: opts.ctx.user } });
});
