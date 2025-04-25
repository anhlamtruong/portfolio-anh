import { baseProcedure, createTRPCRouter } from "@/app/creata/_trpc/init";
import { award_winning_2024_config } from "../config";
import { getFontUrls } from "../service/get-font-url";
import { getVideoUrls } from "../service/get-videos-url";

export const AwardWinning2024Router = createTRPCRouter({
  //Contain the business logic for the AwardWinning2024Router
  // This is where you can add your database queries, API calls, etc.
  getFonts: baseProcedure.query(async () => {
    // Fetch font URLs dynamically
    const fontDictionary = await getFontUrls(
      award_winning_2024_config.fontPath,
      award_winning_2024_config.fontName
    );

    // Generate @font-face rules dynamically
    const fontFaceStyles = Object.entries(fontDictionary)
      .map(
        ([fontName, fontUrl]) => `
      @font-face {
        font-family: "${fontName}";
        src: url("${fontUrl}") format("woff2");
      }
    `
      )
      .join("\n");

    return fontFaceStyles;
  }),
  getHeroVideos: baseProcedure.query(async () => {
    // Fetch video URLs dynamically
    const videos = await getVideoUrls();

    return videos;
  }),
});
