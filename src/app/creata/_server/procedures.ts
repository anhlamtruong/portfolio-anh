import { baseProcedure, createTRPCRouter } from "@/app/creata/_trpc/init";
import { FirebaseCreataClient } from "../_service/firebaseCreataClient";
import { z } from "zod";

// tRPC procedures for Creata
// Handles fetching component metadata

export const CreataRouter = createTRPCRouter({
  getComponentsMetaData: baseProcedure.query(async ({}) => {
    // Fetch component metadata from Firebase or any other source
    const client = new FirebaseCreataClient();
    const metadata = await client.getAllComponentConfigs();
    return metadata;
  }),
  getComponentMetaDataById: baseProcedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      // Fetch component metadata from Firebase or any other source
      const client = new FirebaseCreataClient();
      const metadata = await client.getComponentConfigById(opts.input.id);
      return metadata;
    }),
});
