import { UserRoles } from "@prisma/client";
import { type DefaultSession } from "next-auth";
import "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRoles;
  id: string;
  plan: string;
  lastname: string;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    /** OpenID ID Token */
    role: UserRoles;
    plan: string;
    lastname: string | null;
    isTwoFactorEnabled: boolean;
  }
}
