/* eslint-disable @typescript-eslint/no-explicit-any */
import prismaAuthenticate from "../lib/authenticate_db";
import { MESSAGES } from "../config/message";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prismaAuthenticate.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error: any) {
    console.error(`${MESSAGES.data.user_error}: ${error.message}`);
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await prismaAuthenticate.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error: any) {
    console.error(`${MESSAGES.data.user_error}: ${error.message}`);
    return null;
  }
};
