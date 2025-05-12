/* eslint-disable @typescript-eslint/no-explicit-any */
import prismaAuthenticate from "../lib/authenticate_db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prismaAuthenticate.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error: any) {
    console.error(`[DATA_USER_EMAIL]: ${error.message}`);
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
    console.error(`[DATA_USER_ID]: ${error.message}`);
    return null;
  }
};
