import prismaAuthenticate from "../lib/authenticate_db";

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation =
      await prismaAuthenticate.twoFactorConfirmation.findUnique({
        where: { userId },
      });
    return twoFactorConfirmation;
  } catch (error) {
    console.error("Error fetching two factor confirmation by userId:", error);
    return null;
  }
};
