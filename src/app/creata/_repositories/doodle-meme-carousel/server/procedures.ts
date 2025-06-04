import { publicProcedure, createTRPCRouter } from "@/app/creata/_trpc/init";
import { getDoddleMemeVideosFromStorage } from "../service/doodle-meme-videos";

export const DoodleMemeVideosRouter = createTRPCRouter({
  /**
   * @description Fetches Doodle Meme videos from storage
   * @returns {Promise<Video[]>} List of videos
   */
  getMany: publicProcedure.query(async () => {
    const videos = await getDoddleMemeVideosFromStorage();
    return videos;
  }),
});
