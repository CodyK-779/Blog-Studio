"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import ProfileDropdown from "./ProfileDropdown";
import { authClient } from "@/lib/auth-client";
import logo from "@/public/camera.png";
import Image from "next/image";
import GradientText from "./ui/GradientText";

interface Props {
  setOpenMenu: (openMenu: boolean) => void;
}

const Navbar = ({ setOpenMenu }: Props) => {
  const { data: session } = authClient.useSession();
  const fallbackAvatar = session && session.user.name.charAt(0).toUpperCase();

  const navLinks = [
    { title: "Home", link: "/blog" },
    { title: "Create", link: "/blog/create" },
    { title: "Users", link: "/users" },
    {
      title: "Profile",
      link: `${session ? `/profile/${session.user.id}` : "/profile"}`,
    },
    {
      title: "Blogs",
      link: "/blog/library",
    },
  ];

  return (
    <nav className="sticky top-0 px-8 py-6 border-b-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/blog" className="flex items-center gap-3">
          <Image src={logo} alt="logo" width={36} height={36} />
          {/* <h1 className="text-2xl sm:text-3xl font-bold">Blog Studio</h1> */}
          <GradientText className="max-[400px]:text-2xl text-3xl font-bold">
            Blog Studio
          </GradientText>
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
            <ProfileDropdown
              userImg={session.user.image!}
              fallbackAvatar={fallbackAvatar}
            />
          )}
          <ModeToggle />
        </div>
        <div
          className="cm:hidden cursor-pointer"
          onClick={() => setOpenMenu(true)}
        >
          <i className="ri-menu-2-line text-2xl"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
