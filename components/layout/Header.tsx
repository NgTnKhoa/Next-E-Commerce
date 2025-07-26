import React from "react";
import { LogInIcon, ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggle";
import { MainNav } from "../shared/MainNav";
import { Separator } from "../ui/separator";

const Header = () => {
  return (
    <header className="supports-backdrop-blur:bg-background/90 sticky top-0 z-50 w-full bg-background/90 backdrop-blur mb-4">
      <div className="flex h-14 items-center max-w-screen-2xl mx-auto">
        <div className="flex w-full items-center justify-between px-6">
          <MainNav />
          {/* <MobileNav /> */}
          <div className="flex flex-1 items-center space-x-2 justify-end">
            <CartNav />
            <ThemeToggle />
            {/* {authenticated ? <UserNav /> : <LoginDialog />} */}
            <LoginDialog />
          </div>
        </div>
      </div>
      <Separator className="mb-6" />
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
