import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserInfo } from "./data/user.query";
import { prisma } from "./lib/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      if (token.lastname && session.user) {
        session.user.lastname = token.lastname;
      }
      if (token.plan && session.user) {
        session.user.plan = token.plan;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserInfo({ user_id: token.sub });
      if (!existingUser) return token;
      token.role = existingUser.role;
      token.lastname = existingUser.lastname;
      token.plan = existingUser.plan;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  ...authConfig,
});
