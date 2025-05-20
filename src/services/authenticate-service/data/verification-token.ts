import prismaAuthenticate from "../lib/authenticate_db";
import { MESSAGES } from "../config/message";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken =
      await prismaAuthenticate.verificationToken.findFirst({
        where: { email: email },
      });
    return verificationToken;
  } catch (error) {
    console.error(`${MESSAGES.data.verification_token_error}: ${error}`);
    return null;
  }
};
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken =
      await prismaAuthenticate.verificationToken.findUnique({
        where: { token: token },
      });

    return verificationToken;
  } catch (error) {
    console.error(`${MESSAGES.data.verification_token_error}: ${error}`);
    return null;
  }
};
