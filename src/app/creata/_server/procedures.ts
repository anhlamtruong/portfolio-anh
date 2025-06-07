import {
  publicProcedure,
  authedProcedure,
  createTRPCRouter,
} from "@/app/creata/_trpc/init";
import { z } from "zod";
import { updateAccountSchema } from "../_types";

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
  getCurrentUser: authedProcedure.query(async ({ ctx }) => ctx.user),
  getCurrentUserAccount: authedProcedure.query(async ({ ctx }) => {
    const client = ctx.private_firebase_service;
    if (!ctx.user.id) {
      throw new Error("User is not authenticated.");
    }
    if (!client) {
      throw new Error("Private Firebase service is not initialized.");
    }
    const user = await client.getUserById(ctx.user.id);
    return user ?? null; // Return null if user not found
  }),
  getUserById: authedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      // Fetch user data by ID from Firebase or any other source
      const client = ctx.private_firebase_service;
      if (!client) {
        throw new Error("Private Firebase service is not initialized.");
      }
      const user = await client.getUserById(input.id);
      return user ?? null; // Return null if user not found
    }),
  updateAccount: authedProcedure
    .input(updateAccountSchema)
    .mutation(async ({ ctx, input }) => {
      // Update user data in Firebase or any other source
      const client = ctx.private_firebase_service;
      if (!client) {
        throw new Error("Private Firebase service is not initialized.");
      }
      if (!ctx.user.id) {
        throw new Error("User is not authenticated.");
      }
      const updateData = {
        ...input,
        id: ctx.user.id,
      };
      const result = await client.updateAccountService(updateData);
      return result; // Return the result of the update operation
    }),
});
