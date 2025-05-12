"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import prismaAuthenticate from "../lib/authenticate_db";

import { NewPasswordSchema } from "../schemas";
import { getUserByEmail } from "../data/user";
import { getPasswordResetTokenByToken } from "../data/password_reset_token";
export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing Token!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Password" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid Token!" };
  }

  const hasExpired = (await new Date(existingToken.expires)) < new Date();
  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }
  if (!existingUser || !existingUser.password) {
    return { error: "User might use third-party login, such Github or Google" };
  } else {
  }
  const oldPassword = existingUser.password;

  const isSamePassword = await bcrypt.compare(password, oldPassword);
  if (isSamePassword) {
    return { error: "Password is the same as previous password!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = existingUser.id;
  await prismaAuthenticate.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  await prismaAuthenticate.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Your password have been reset 🎉" };
};
