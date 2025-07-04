"use client";

import { useSession } from "@/lib/auth-client";
import { ModeToggle } from "./ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import SignoutButton from "./SignoutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  openMenu: boolean;
  setOpenMenu: (openMenu: boolean) => void;
}

const sidebarStyles =
  "cm:hidden fixed z-30 rounded top-0 right-0 min-h-screen w-[300px] max-[400px]:w-full bg-white/60 backdrop-blur-lg dark:bg-neutral-800/70 shadow transform transition-transform duration-300";

const Sidebar = ({ openMenu, setOpenMenu }: Props) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const navLinks = [
    { title: "Home", link: "/blog" },
    { title: "Create", link: "/blog/create" },
    { title: "Users", link: "/users" },
    {
      title: "Profile",
      link: `${session ? `/profile/${session.user.id}` : "/login"}`,
    },
    {
      title: "Blogs",
      link: "/blog/library",
    },
  ];

  const fallbackAvatar = session && session.user.name.charAt(0).toUpperCase();
  return (
    <div
      className={`${sidebarStyles} ${
        openMenu ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        className={`absolute top-7 right-8 text-2xl cursor-pointer`}
        onClick={() => setOpenMenu(false)}
      >
        <i className="ri-close-large-fill font-medium"></i>
      </div>
      <div className="absolute top-7 left-4">
        <ModeToggle />
      </div>
      {session && (
        <div className="flex items-center justify-between absolute mt-32 px-4">
          <div className="flex items-center gap-2 mb-6">
            <Avatar className="cursor-pointer size-12">
              <AvatarImage src={session.user.image!} />
              <AvatarFallback className="bg-red-500 dark:bg-blue-600 text-white">
                {fallbackAvatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{session.user.name}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {session.user.email}
              </p>
            </div>
          </div>
        </div>
      )}
      <ul className="flex flex-col items-center justify-center gap-6 mt-60">
        {navLinks.map((link) => {
          const isActive = pathname === link.link;

          return (
            <Link
              key={link.title}
              href={link.link}
              onClick={() => setOpenMenu(false)}
              className={`font-semibold ${
                isActive && "text-red-500 dark:text-blue-600"
              } hover:text-red-500 dark:hover:text-blue-500 transition-colors duration-150`}
            >
              {link.title}
            </Link>
          );
        })}
      </ul>
      {session ? (
        <div className="flex items-center justify-center pt-20">
          <SignoutButton />
        </div>
      ) : (
        <div className="flex items-center justify-center pt-20">
          <Button asChild>
            <Link href="/login" className="font-semibold">
              Register
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
