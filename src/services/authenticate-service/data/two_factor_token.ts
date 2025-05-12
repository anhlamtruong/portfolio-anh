import prismaAuthenticate from "../lib/authenticate_db";

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await prismaAuthenticate.twoFactorToken.findFirst({
      where: { email: email },
    });
    return twoFactorToken;
  } catch (error) {
    console.error("Error fetching two factor token by email:", error);
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
    console.error("Error fetching two factor token :", error);
    return null;
  }
};
