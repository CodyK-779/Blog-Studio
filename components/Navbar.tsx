"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import ProfileDropdown from "./ProfileDropdown";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const navLinks = [
  { title: "Home", link: "/" },
  { title: "Create", link: "/create" },
  { title: "Users", link: "/users" },
  { title: "Profile", link: "/profile" },
];

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="sticky top-0 px-8 py-6 border-b-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="text-3xl font-bold">NextBlog</h1>
        </Link>
        <ul className="hidden cm:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.link}
              href={link.link}
              className="font-semibold hover:text-red-500 dark:hover:text-blue-500 transition-colors duration-150"
            >
              {link.title}
            </Link>
          ))}
        </ul>
        <div className="hidden cm:flex items-center gap-6">
          {!session ? (
            <Button asChild>
              <Link href="/login" className="font-semibold">
                Register
              </Link>
            </Button>
          ) : (
            <ProfileDropdown userImg={session.user.image!} />
          )}
          <ModeToggle />
        </div>
        <div className="cm:hidden">
          <i className="ri-menu-2-line text-2xl"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
