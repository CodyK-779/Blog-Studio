import Image from "next/image";
import logo from "@/public/camera.png";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

const Footer = () => {
  const { data: session } = useSession();

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

  const creditLinks = [
    { title: "GTA VI", link: "https://www.rockstargames.com/VI" },
    { title: "Arcane", link: "https://www.google.com/search?q=arcane" },
    { title: "Valorant", link: "https://playvalorant.com" },
    { title: "Lamborghini", link: "https://configurator.lamborghini.com/" },
    { title: "Ghost Runner", link: "https://ghostrunnergame.com/" },
    { title: "Yoneyama Mai 米山舞", link: "https://x.com/yoneyamai" },
  ];

  return (
    <div className="w-full mt-20 border-t-2 border-neutral-300 dark:border-neutral-800 dark:bg-black py-16">
      <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-start gap-8 border-b-2 pb-8 border-neutral-300 dark:border-neutral-800">
        {/* First row */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="logo" width={46} height={46} />
            <p className="text-2xl font-semibold">Blog Studio</p>
          </div>

          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300 mt-2 w-[300px]">
            Blog Studio is a place where you can share and find all kinds of
            cool blog posts with different categories
          </p>
        </div>

        {/* Second row */}
        <div className="flex flex-col items-start md:items-center gap-2">
          <p className="text-xl font-semibold mb-2">Links</p>
          <ul className="flex flex-col items-start md:items-center text-sm gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.link}
                href={link.link}
                className="font-medium text-neutral-600 dark:text-neutral-300 hover:text-red-500 dark:hover:text-blue-600 transition-colors duration-150 ease-in"
              >
                {link.title}
              </Link>
            ))}
          </ul>
        </div>

        {/* Third row */}
        <div className="flex flex-col items-start md:items-center gap-2">
          <p className="text-xl font-semibold mb-2">Credits</p>
          <ul className="flex flex-col items-start md:items-center text-sm gap-3">
            {creditLinks.map((link) => (
              <Link
                key={link.link}
                href={link.link}
                className="font-medium text-neutral-600 dark:text-neutral-300 hover:text-red-500 dark:hover:text-blue-600 transition-colors duration-150 ease-in"
              >
                {link.title}
              </Link>
            ))}
          </ul>
        </div>

        {/* Fourth row */}
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Follow me on</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 font-medium mt-2">
            This doesn't work it's just for show LMAO cuz it looks cool
          </p>
          <div className="flex items-center mt-4 gap-3">
            <i className="ri-github-fill text-2xl cursor-pointer"></i>
            <i className="ri-facebook-circle-fill text-2xl cursor-pointer"></i>
            <i className="ri-twitter-x-line text-xl cursor-pointer"></i>
            <i className="ri-instagram-line text-xl cursor-pointer"></i>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="container px-2 text-neutral-600 dark:text-neutral-300 flex flex-col cm:flex-row gap-1.5 items-center justify-center mt-10">
        <p>
          © 2025 Blog Studio All rights reserved.{" "}
          <span className="mx-4 hidden cm:inline-block">|</span>
        </p>
        <div className="flex items-center gap-4 text-sm cm:text-base">
          <p className="hover:underline cursor-pointer">Privacy Policy</p>
          <p className="hover:underline cursor-pointer">Terms of Service</p>
          <p className="hover:underline cursor-pointer">Contact Us</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
