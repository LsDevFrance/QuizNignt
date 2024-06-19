"use server";

import { getVerificationTokenByToken } from "@/data/verification-token.query";
import { sendVerificationEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/token";
export const verifyEmail = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return {
      error: "Invalid token",
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: existingToken.email,
    },
  });
  if (!existingUser) {
    return {
      error: "Email does not exist",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    const newToken = await generateVerificationToken(existingToken.email);
    await sendVerificationEmail(newToken.email, newToken.token);
    return {
      error: "Token expired and new token sent",
    };
  }

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await prisma.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });
  return {
    success: "Email verified successfully. Proceed to login ",
  };
};
