import React from "react";
import { LogInIcon, MoonIcon, ShoppingBasketIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggle";
import { MainNav } from "../shared/MainNav";

const Header = () => {
  return (
    <header className="supports-backdrop-blur:bg-background/90 sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur mb-4 px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]">
      <div className="flex h-14 items-center">
        <MainNav />
        {/* <MobileNav /> */}
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <CartNav />
          <ThemeToggle />
          {/* {authenticated ? <UserNav /> : <LoginDialog />} */}
        </div>
      </div>
    </header>
  );
};

function CartNav() {
  return (
    <Link href="/cart">
      <Button size="icon" variant="outline" className="h-9">
        <ShoppingBasketIcon className="h-4" />
      </Button>
    </Link>
  );
}

function LoginDialog() {
  return (
    <Link href="/login">
      <Button className="font-medium flex gap-2">
        <LogInIcon className="h-4" />
        <p>Login</p>
      </Button>
    </Link>
  );
}

export default Header;
