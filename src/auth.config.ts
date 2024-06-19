import bcrypt from "bcryptjs";
import { CredentialsSignin, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "../app/(marketing)/auth/login/login.schema";
import { prisma } from "./lib/prisma";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validFields = LoginSchema.safeParse(credentials);
        if (validFields.success) {
          const { email, password } = validFields.data;
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user || !user.password) {
            console.log("User not found");
            throw new CredentialsSignin("Invalid credentials");
          }
          console.log("User found ne rentre pas dans le if");
          const passwordValid = await bcrypt.compare(password, user.password);
          if (passwordValid) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
