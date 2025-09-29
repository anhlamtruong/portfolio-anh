import {
  publicProcedure,
  authedProcedure,
  createTRPCRouter,
} from "@/app/creata/_trpc/init";
import { z } from "zod";
import { updateAccountSchema } from "../_types";
import { TRPCError } from "@trpc/server";

// tRPC procedures for Creata
// Handles fetching component metadata

/**
 * Unprotected procedures
 */
export const PublicCreataRouter = createTRPCRouter({
  getComponentsMetaData: publicProcedure.query(async ({ ctx }) => {
    // Fetch component metadata from Firebase or any other source
    try {
      const client = ctx.public_firebase_service;
      if (!client) {
        throw new TRPCError({
          code: "CLIENT_CLOSED_REQUEST",
          message:
            "Public Procedure Error - getComponentsMetaData. Access to the resource has been denied.",
        });
      }
      const metadata = await client.getAllComponentConfigs();
      console.log(metadata);
      return metadata;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Public Procedure Error - getComponentsMetaData. An unspecified error occurred: ${error}`,
      });
    }
  }),
  getComponentMetaDataById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      // Fetch component metadata from Firebase or any other source
      try {
        if (!input.id) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Public Procedure Error - getComponentMetaDataById. ID could not be found. The server cannot or will not process the request due to something that is perceived to be a client error.",
          });
        }
        const client = ctx.public_firebase_service;
        if (!client) {
          throw new TRPCError({
            code: "CLIENT_CLOSED_REQUEST",
            message:
              "Public Procedure Error - getComponentMetaDataById. Access to the resource has been denied.",
          });
        }
        const metadata = await client.getComponentConfigById(input.id);
        return metadata;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Public Procedure Error - getComponentMetaDataById. An unspecified error occurred: ${error}`,
        });
      }
    }),
});

/**
 * Protected procedures
 */
export const PrivateCreataRouter = createTRPCRouter({
  getCurrentUser: authedProcedure.query(async ({ ctx }) => {
    try {
      return ctx.user;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Private Procedure Error - getCurrentUser. An unspecified error occurred: ${error}`,
      });
    }
  }),
  getCurrentUserAccount: authedProcedure.query(async ({ ctx }) => {
    try {
      if (!ctx.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message:
            "Private Procedure Error - getCurrentUserAccount. The client request has not been completed because it lacks valid authentication credentials for the requested resource.",
        });
      }
      const client = ctx.private_firebase_service;
      if (!client) {
        throw new TRPCError({
          code: "CLIENT_CLOSED_REQUEST",
          message:
            "Private Procedure Error - getCurrentUserAccount. Access to the resource has been denied.",
        });
      }
      const user = await client.getUserById(ctx.user.id);
      return user;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Private Procedure Error - getCurrentUserAccount. An unspecified error occurred: ${error}`,
      });
    }
  }),
  getUserById: authedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      // Fetch user data by ID from Firebase or any other source
      try {
        if (!ctx.user.id) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message:
              "Private Procedure Error - getUserById. The client request has not been completed because it lacks valid authentication credentials for the requested resource.",
          });
        }
        const client = ctx.private_firebase_service;
        if (!client) {
          throw new TRPCError({
            code: "CLIENT_CLOSED_REQUEST",
            message:
              "Private Procedure Error - getUserById. Access to the resource has been denied.",
          });
        }
        const user = await client.getUserById(input.id);
        return user;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Private Procedure Error - getUserById. An unspecified error occurred: ${error}`,
        });
      }
    }),
  updateAccount: authedProcedure
    .input(updateAccountSchema)
    .mutation(async ({ ctx, input }) => {
      // Update user data in Firebase or any other source
      try {
        if (!ctx.user.id) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message:
              "Private Procedure Error - updateAccount. The client request has not been completed because it lacks valid authentication credentials for the requested resource.",
          });
        }
        const client = ctx.private_firebase_service;
        if (!client) {
          throw new TRPCError({
            code: "CLIENT_CLOSED_REQUEST",
            message:
              "Private Procedure Error - updateAccount. Access to the resource has been denied.",
          });
        }
        const updateData = {
          ...input,
          id: ctx.user.id,
        };
        const result = await client.updateAccountService(updateData);
        return {
          status: "success",
          data: result,
          message: "Update Account Successfully",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Private Procedure Error - updateAccount. An unspecified error occurred: ${error}`,
        });
      }
    }),
});
