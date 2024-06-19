"use client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";

const LinkNavigation = () => {
  return (
    <>
      <li>
        <a href="#" className="text-foreground/50 hover:text-foreground">
          Features
        </a>
      </li>

      <li>
        <a
          href="#princing"
          className="text-foreground/50 hover:text-foreground"
        >
          {" "}
          Pricing
        </a>
      </li>

      <li>
        <a href="#" className="text-foreground/50 hover:text-foreground">
          {" "}
          FAQ
        </a>
      </li>

      <li>
        <a href="#" className="text-foreground/50 hover:text-foreground">
          {" "}
          Blog
        </a>
      </li>
    </>
  );
};

const NavigationResponsive = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <HamburgerMenuIcon className="block md:hidden" />
      </SheetTrigger>
      <SheetContent side="top" className="flex flex-col">
        <nav className="">
          <ul className="flex flex-col items-center gap-6 text-sm">
            <LinkNavigation />
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b-2 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Image
            src="/icon.png"
            alt="logo"
            width={50}
            height={50}
            className=" object-contain "
          />
          <Link href={"/"}>Quiz Night</Link>
        </div>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <LinkNavigation />
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="items-center sm:flex sm:gap-4">
              <Link href="/auth/login">Login</Link>
            </div>

            <NavigationResponsive />
          </div>
        </div>
      </div>
    </header>
  );
}
