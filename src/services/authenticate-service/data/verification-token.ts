import prismaAuthenticate from "../lib/authenticate_db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken =
      await prismaAuthenticate.verificationToken.findFirst({
        where: { email: email },
      });
    return verificationToken;
  } catch (error) {
    console.error(`[DATA_VERIFICATION_TOKEN_EMAIL]: ${error}`);
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
    console.error(`[DATA_VERIFICATION_TOKEN_TOKEN]: ${error}`);
    return null;
  }
};
