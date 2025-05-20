"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import prismaAuthenticate from "../lib/authenticate_db";
import { getUserByEmail, getUserById } from "../data/user";
import { currentUser } from "../lib/auth";
import { update } from "@/auth";
import { SettingsSchema } from "../schemas";
import { generateVerificationToken } from "../lib/tokens";
import { sendVerificationEmail } from "../lib/mail";
import { MESSAGES } from "../config/message";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user || !user?.id) {
    return { error: MESSAGES.actions.settings.error_unauthorized };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: MESSAGES.actions.settings.error_unauthorized };
  }
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: MESSAGES.actions.settings.error_email_taken };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: MESSAGES.actions.verification.success };
  }
  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordsMatch) {
      return { error: MESSAGES.actions.settings.error_incorrect_password };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await prismaAuthenticate.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      role: updatedUser.role,
    },
  });

  return { success: MESSAGES.actions.settings.success };
};
