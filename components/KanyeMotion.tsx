"use client";

import { motion } from "framer-motion";

const KanyeMotion = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-snug text-neutral-800 dark:text-white">
            This website is so amazing,
            <br />
            even{" "}
            <span className="text-[#2D27FF] dark:text-[#FF0A6C] font-extrabold">
              Kanye West
            </span>{" "}
            has something to say about it!
          </h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">
            Here's a short clip from the man himself. 🔥
          </p>
        </motion.div>

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
          className="flex-1 w-full max-w-md md:max-w-lg lg:max-w-xl"
        >
          <div className="rounded-xl overflow-hidden shadow-xl ring-2 ring-blue-500/30 dark:ring-pink-500/30">
            <video
              controls
              src="/umm.mp4"
              className="w-[300px] place-self-center h-auto object-cover bg-black"
            />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default KanyeMotion;
