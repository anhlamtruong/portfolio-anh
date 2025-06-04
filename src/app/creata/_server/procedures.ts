import {
  publicProcedure,
  authedProcedure,
  createTRPCRouter,
} from "@/app/creata/_trpc/init";
import { z } from "zod";

// tRPC procedures for Creata
// Handles fetching component metadata

/**
 * Unprotected procedures
 */
export const PublicCreataRouter = createTRPCRouter({
  getComponentsMetaData: publicProcedure.query(async ({ ctx }) => {
    // Fetch component metadata from Firebase or any other source
    const client = ctx.public_firebase_service;
    const metadata = await client.getAllComponentConfigs();
    return metadata;
  }),
  getComponentMetaDataById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      // Fetch component metadata from Firebase or any other source
      const client = ctx.public_firebase_service;
      const metadata = await client.getComponentConfigById(input.id);
      return metadata;
    }),
});

/**
 * Protected procedures
 */
export const PrivateCreataRouter = createTRPCRouter({
  getCurrentUser: authedProcedure.query(({ ctx }) => ctx.user),
  getUserById: authedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      // Fetch user data by ID from Firebase or any other source
      const client = ctx.private_firebase_service;
      if (!client) {
        throw new Error("Private Firebase service is not initialized.");
      }
      const user = await client.getUserById(input.id);
      return user;
    }),
});
