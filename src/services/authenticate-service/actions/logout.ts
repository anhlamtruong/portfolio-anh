"use server";

import { signOut } from "@/auth";
import { toast } from "sonner";
import { MESSAGES } from "../config";

export const logout = async (callbackUrl: string) => {
  await signOut({ redirectTo: callbackUrl });
  toast.success(MESSAGES.actions.logout.success);
};
