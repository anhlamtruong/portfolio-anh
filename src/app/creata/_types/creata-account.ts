// Account types for Creata
import { RouterInputs, RouterOutputs } from "./trpc";
import { z } from "zod";

// Types for updating current user account
export type CreataAccountUpdateInput =
  RouterInputs["private_creata"]["updateAccount"];
export type CreataAccountUpdateOutput =
  RouterOutputs["private_creata"]["updateAccount"];

// Types for fetching user account by ID
export type CreataAccountByIdUpdateOutput =
  RouterOutputs["private_creata"]["getUserById"];
export type CreataAccountByIdUpdateInput =
  RouterInputs["private_creata"]["getUserById"];

// Input schema for updating user account
export const updateAccountSchema = z.object({
  /**
   * Input schema for updating user account
   * Used in the Creata account settings form and procedures
   */
  name: z.string().optional(),
  username: z
    .string()
    .min(6)
    .max(30)
    .trim()
    .regex(/^[a-z0-9]+$/)
    .optional(),
  avatarURL: z.string().optional(),
  email: z.string().email().optional(),
});
