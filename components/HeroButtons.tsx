"use client";

import { motion } from "framer-motion";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

const HeroButtons = () => {
  const { data: session } = useSession();

  const createRestrict = session ? "/blog/create" : "/login";

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 2 }}
      className="flex items-center justify-center gap-4 z-10"
    >
      <Button
        size="lg"
        asChild
        className="font-semibold text-md bg-red-500 hover:bg-red-600 dark:bg-blue-600 dark:text-black dark:hover:bg-blue-700 transition-colors duration-150 ease-in"
      >
        <Link href={createRestrict}>Get Started</Link>
      </Button>
      <Button size="lg" className="font-semibold text-md" asChild>
        <Link href="#blog-section">Explore</Link>
      </Button>
    </motion.div>
  );
};

export default HeroButtons;
