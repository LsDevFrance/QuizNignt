import { auth } from "@/auth";
import { DropdownMenuItemLogout } from "@/components/dashboard/DropdownMenuItemLogout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bell, HomeIcon, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavigationLinks = ({
  style,
  styleActive,
}: {
  style: string;
  styleActive: string;
}) => (
  <>
    <Link href="/dashboard" className={style}>
      <HomeIcon className="size-4" />
      Home
    </Link>
  </>
);

const Sidebar = ({
  style,
  styleActive,
}: {
  style: string;
  styleActive: string;
}) => (
  <div className="hidden border-r bg-muted/40 md:block">
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image width="50" height="50" src="/icon.png" alt="logo app" />
          <span>Quiz Night</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <NavigationLinks style={style} styleActive={styleActive} />
        </nav>
      </div>
    </div>
  </div>
);

const MobileNav = ({
  style,
  styleActive,
}: {
  style: string;
  styleActive: string;
}) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" size="icon" className="shrink-0 md:hidden">
        <Menu className="size-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="flex flex-col">
      <nav className="grid gap-2 text-lg font-medium">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <Image width="50" height="50" src="/icon.png" alt="logo app" />
          <span>Book Buddy</span>
        </Link>
        <NavigationLinks style={style} styleActive={styleActive} />
      </nav>
    </SheetContent>
  </Sheet>
);

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) throw new Error("No session found");
  const style =
    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
  const styleActive =
    "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary";
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr]">
      <Sidebar style={style} styleActive={styleActive} />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <MobileNav style={style} styleActive={styleActive} />

          <Button variant="outline" size="icon" className="ml-auto size-8">
            <Bell className="size-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {session?.user?.name}
                <Avatar className=" ml-2 size-5">
                  <AvatarFallback>{session.user?.email?.[0]}</AvatarFallback>
                  {session?.user?.image ? (
                    <AvatarImage src={session.user.image} />
                  ) : (
                    <AvatarImage
                      src={`https://api.dicebear.com/9.x/initials/svg?seed=${
                        session?.user?.name || "null"
                      }`}
                    />
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/account">Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItemLogout />
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex max-h-[calc(100vh-4rem)] flex-1 flex-col gap-4 overflow-auto p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
