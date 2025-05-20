import prismaAuthenticate from "../lib/authenticate_db";
import { MESSAGES } from "../config/message";

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken =
      await prismaAuthenticate.passwordResetToken.findFirst({
        where: { email: email },
      });
    return passwordResetToken;
  } catch (error) {
    console.error(MESSAGES.data.password_reset_token_error, error);
    return null;
  }
};
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken =
      await prismaAuthenticate.passwordResetToken.findUnique({
        where: { token: token },
      });

    return passwordResetToken;
  } catch (error) {
    console.error(MESSAGES.data.password_reset_token_error, error);
    return null;
  }
};
