import crypt from "crypto";
import { v4 as uuid_v4 } from "uuid";

import prismaAuthenticate from "../lib/authenticate_db";
import { getVerificationTokenByEmail } from "../data/verification-token";
import { getPasswordResetTokenByEmail } from "../data/password_reset_token";

import { getTwoFactorTokenByEmail } from "../data/two_factor_token";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypt.randomInt(100_000, 1_000_000).toString();

  //TODO: Later change to 15 minutes
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await prismaAuthenticate.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const twoFactorToken = await prismaAuthenticate.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return twoFactorToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuid_v4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prismaAuthenticate.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }
  const newVerificationToken =
    await prismaAuthenticate.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
  return newVerificationToken;
};
export const generatePasswordResetToken = async (email: string) => {
  const token = uuid_v4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prismaAuthenticate.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }
  const newPasswordResetToken =
    await prismaAuthenticate.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
  return newPasswordResetToken;
};
