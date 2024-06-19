"use server";

import { signOut } from "@/auth";

export default async function LogoutAction() {
  return await signOut({ redirectTo: "/auth/login" });
}
