import { baseProcedure, createTRPCRouter } from "@/app/creata/_trpc/init";
import { getLogosFromStorage } from "../_services/logo-loader/actions/get-logos-storage";

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
});
