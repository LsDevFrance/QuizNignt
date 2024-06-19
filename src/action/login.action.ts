"use server";
import bcrypt from "bcryptjs";

import { signIn } from "@/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/token";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import {
  LoginFormType,
  LoginSchema,
} from "../../app/(marketing)/auth/login/login.schema";
import { DEFAULT_LOGIN_REDIRECT } from "../../routes";

export const loginAction = async (values: LoginFormType) => {
  const validatedFileds = LoginSchema.safeParse(values);
  if (!validatedFileds.success) {
    return { success: false, message: "Invalid fields!" };
  }
  const { email, password } = values;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (!existingUser || !existingUser.password || !existingUser.email) {
    return { success: false, message: "Invalid credentials" };
  }

  // check if password exists compare before sending 2FA token
  if (existingUser.password) {
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return { success: false, message: "Invalid credentials" };
    }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    try {
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );
    } catch {
      return { success: false, message: "Error sent email confirmation!" };
    }
    return { success: true, message: "Confirmation email sent !" };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          // throw new ActionError("Invalid credentials");
          return { success: false, message: "Invalid credentials" };
        case "CallbackRouteError":
          // throw new ActionError("Callback route error");
          return { success: false, message: "Invalid credentials" };
        default:
          // throw new ActionError(`Something went wrong ${error.type}`);
          return {
            success: false,
            message: `Something went wrong ${error.type}`,
          };
      }
    }
    throw error;
  }
  return { success: true, message: "Email sent !" };
};
