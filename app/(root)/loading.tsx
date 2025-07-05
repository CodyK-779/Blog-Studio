"use client";

import { motion } from "framer-motion";
import logo from "@/public/camera.png";
import Image from "next/image";
import GradientText from "@/components/ui/GradientText";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-100 dark:from-[#1e1e1e] dark:to-[#0d0d0d]">
      <motion.div
        className="text-4xl md:text-6xl font-extrabold text-white flex gap-2 items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Image src={logo} alt="logo" width={46} height={46} />
        <GradientText>Loading</GradientText>
        <span className="animate-pulse">...</span>
      </motion.div>
    </div>
  );
}
