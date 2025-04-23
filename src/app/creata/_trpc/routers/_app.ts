import { createTRPCRouter } from "../init";
import { DoodleMemeVideosRouter } from "@/app/creata/_repositories/doodle-meme-carousel/server/procedures";
export const appRouter = createTRPCRouter({
  doodle_meme_videos: DoodleMemeVideosRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
