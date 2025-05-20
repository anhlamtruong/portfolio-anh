import prismaAuthenticate from "../lib/authenticate_db";
import { MESSAGES } from "../config/message";

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await prismaAuthenticate.twoFactorToken.findFirst({
      where: { email: email },
    });
    return twoFactorToken;
  } catch (error) {
    console.error(MESSAGES.data.two_factor_token_error, error);
    return null;
  }
};
export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await prismaAuthenticate.twoFactorToken.findUnique({
      where: { token: token },
    });

    return twoFactorToken;
  } catch (error) {
    console.error(MESSAGES.data.two_factor_token_error, error);
    return null;
  }
};
