import {
  publicProcedure,
  authedProcedure,
  createTRPCRouter,
} from "@/app/creata/_trpc/init";
import { FirebaseCreataClient } from "../_service/firebaseCreataClient";
import { z } from "zod";

// tRPC procedures for Creata
// Handles fetching component metadata

export const CreataRouter = createTRPCRouter({
  getComponentsMetaData: publicProcedure.query(async ({}) => {
    // Fetch component metadata from Firebase or any other source
    const client = new FirebaseCreataClient();
    const metadata = await client.getAllComponentConfigs();
    return metadata;
  }),
  getComponentMetaDataById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      // Fetch component metadata from Firebase or any other source
      const client = new FirebaseCreataClient();
      const metadata = await client.getComponentConfigById(opts.input.id);
      return metadata;
    }),
});

export const userRouter = createTRPCRouter({
  getCurrentUser: authedProcedure.query(({ ctx }) => ctx.user),
  // you can add update, list, delete…
});
