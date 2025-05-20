import prismaAuthenticate from "../lib/authenticate_db";
import { MESSAGES } from "../config/message";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation =
      await prismaAuthenticate.twoFactorConfirmation.findUnique({
        where: { userId },
      });
    return twoFactorConfirmation;
  } catch (error) {
    console.error(MESSAGES.data.two_factor_confirmation_error, error);
    return null;
  }
};
