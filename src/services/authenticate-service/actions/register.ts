"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "../schemas";
import prismaAuthenticate from "../lib/authenticate_db";
import { getUserByEmail } from "../data/user";
import { generateVerificationToken } from "../lib/tokens";
import { sendVerificationEmail } from "../lib/mail";
import { MESSAGES } from "../config";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: MESSAGES.actions.register.error_invalid_fields };
    }
    if (!prismaAuthenticate) {
      return { error: MESSAGES.actions.register.error_database };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: MESSAGES.actions.register.error_email_taken };
    }
    await prismaAuthenticate?.user.create({
      data: { name, email, password: hashedPassword },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: MESSAGES.actions.register.success };
  } catch (error) {
    console.error("Error in register action:", error);
    return { error: MESSAGES.actions.register.error };
  }
};
