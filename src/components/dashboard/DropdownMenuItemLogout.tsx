"use client";

import LogoutAction from "@/action/logout.action";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export const DropdownMenuItemLogout = () => {
  return (
    <DropdownMenuItem
      className="hover:!bg-destructive"
      onClick={async () => LogoutAction()}
    >
      Logout
    </DropdownMenuItem>
  );
};
