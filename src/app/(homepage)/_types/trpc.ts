import type { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "../_trpc/routers/_app";

// export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
