import { getLogosFromStorage } from "../_services/logo-loader/actions/get-logos-storage";
import { incrementAndGetViews } from "../_services/logo-loader/actions/viewer-count-firestore";
import { baseProcedure, createTRPCRouter } from "../_trpc/init";

// tRPC procedures for the Home page
// Handles fetching video URLs and font styles dynamically

export const HomePageRouter = createTRPCRouter({
  getLogos: baseProcedure.query(async () => {
    try {
      // Fetch logos from Firebase storage
      // This function is defined in the logo-loader service
      const logos = await getLogosFromStorage();
      return logos;
    } catch (error) {
      console.error("[LOGOS_GET]", error);
    }
  }),
  getAndIncrementView: baseProcedure
    // 1. Remove the .input() since we no longer need a slug
    .mutation(async () => {
      // 2. Reference the specific document ID
      const count = await incrementAndGetViews();
      console.log(`Total views at procedure: ${count}`);
      return count;
    }),
});
