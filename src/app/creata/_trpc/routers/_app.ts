import { AwardWinning2024Router } from "../../_repositories/award-winning-2024/server/procedures";
import { DoodleMemeVideosRouter } from "../../_repositories/doodle-meme-carousel/server/procedures";
import { CreataRouter } from "../../_server/procedures";
import { createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  doodle_meme_videos: DoodleMemeVideosRouter,
  award_winning_2024: AwardWinning2024Router,
  creata: CreataRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
