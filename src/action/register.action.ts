"use server";

import { sendVerificationEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/token";
import { action, ActionError } from "@/utils/safe-action";
import bcrypt from "bcryptjs";
import { InfoRegisterSchema } from "../../app/(marketing)/auth/register/register.schema";

export const registerAction = action(InfoRegisterSchema, async (values) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const { name, lastname, email, password } = values;
  const passwordHash = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new ActionError("User already exists");
  }

  await prisma.user.create({
    data: {
      name,
      lastname,
      email,
      password: passwordHash,
      image: `https://api.dicebear.com/9.x/initials/svg?seed=${name}`,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  console.log("verificationToken", verificationToken);
  try {
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
  } catch {
    return { success: false, message: "Error sent email confirmation!" };
  }

  return { success: true, message: "Confirmation email sent!" };
});
