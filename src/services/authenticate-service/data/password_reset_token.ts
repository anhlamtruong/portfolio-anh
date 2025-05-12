import prismaAuthenticate from "../lib/authenticate_db";

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken =
      await prismaAuthenticate.passwordResetToken.findFirst({
        where: { email: email },
      });
    return passwordResetToken;
  } catch (error) {
    console.error("Error fetching password reset token by email:", error);
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
    console.error("Error fetching password reset token :", error);
    return null;
  }
};
