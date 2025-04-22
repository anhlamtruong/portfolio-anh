import { createTRPCRouter } from "../init";
import { DoodleMemeVideosRouter } from "@/app/creata/(slug)/_component/doodle-meme-carousel/server/procedures";
export const appRouter = createTRPCRouter({
  doodle_meme_videos: DoodleMemeVideosRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
