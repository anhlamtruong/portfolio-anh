import { AppRouter } from "@/app/creata/_trpc/routers/_app";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export type DoodleMemeVideosGetManyOutput =
  inferRouterOutputs<AppRouter>["doodle_meme_videos"]["getMany"];
export type Outputs = inferRouterInputs<AppRouter>;
