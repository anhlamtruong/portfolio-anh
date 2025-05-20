"use server";

import { MESSAGES } from "../config";
import { UserRole } from "../generated/authenticate/@prisma-authenticate";
import { currentRole } from "../lib/auth";

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: MESSAGES.actions.admin.success };
  }

  return { error: MESSAGES.actions.admin.error };
};
