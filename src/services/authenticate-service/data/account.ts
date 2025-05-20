import prismaAuthenticate from "../lib/authenticate_db";
import { MESSAGES } from "../config/message";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await prismaAuthenticate.account.findFirst({
      where: { userId },
    });

    return account;
  } catch(error){
    console.error(MESSAGES.data.account_not_found);
    return {error: error};
  }
};
