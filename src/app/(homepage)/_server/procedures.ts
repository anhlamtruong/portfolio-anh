import { TRPCError } from "@trpc/server";
import { getLogosFromStorage } from "../_services/logo-loader/actions/get-logos-storage";
import {
  getViews,
  incrementAndGetViews,
  incrementView,
} from "../_services/website-views-count/actions/viewer-count-firestore";
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
      try {
        const count = await incrementAndGetViews();
        console.log(`Total views at procedure: ${count}`);
        return { count: count ?? 0 };
      } catch (error) {
        console.error("[TRPC_ERROR] Failed in getAndIncrementView:", error);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to increment and get views.",
          cause: error,
        });
      }
    }),
  incrementPageView: baseProcedure
    // 1. Remove the .input() since we no longer need a slug
    .mutation(async () => {
      try {
        await incrementView();
        return { status: "success" };
      } catch (error) {
        console.error("[TRPC_ERROR] Failed in IncrementView:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to increment views.",
          cause: error,
        });
      }
    }),
  getPageView: baseProcedure
    // 1. Remove the .input() since we no longer need a slug
    .query(async () => {
      try {
        const count = await getViews();
        console.log(`Total views at procedure: ${count}`);
        return { status: "success", count: count.toString() ?? "0" };
      } catch (error) {
        console.error("[TRPC_ERROR] Failed in getPageView:", error);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to increment and get views.",
          cause: error,
        });
      }
    }),
});
