"use client";

import { Card, CardContent } from "./ui/card";
import CountUp from "./ui/CountUp";
import { motion } from "framer-motion";

interface Props {
  users: number;
  posts: number;
}

const CountMotion = ({ users, posts }: Props) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
    >
      <Card className="md:max-w-5xl mx-auto border-2 border-zinc-200 dark:border-[#3F3F46] shadow-md dark:shadow-lg">
        <CardContent className="py-10 px-6 sm:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {/* Total Blogs */}
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-neutral-700 dark:text-neutral-200">
                Total Blogs
              </h2>
              <CountUp
                from={0}
                to={posts}
                separator=","
                direction="up"
                duration={1}
                className="text-3xl font-bold text-[#FF0A6C] dark:text-[#2D27FF]"
              />
            </div>

            {/* Total Users */}
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-neutral-700 dark:text-neutral-200">
                Total Users
              </h2>
              <CountUp
                from={0}
                to={users}
                separator=","
                direction="up"
                duration={1}
                className="text-3xl font-bold text-[#FF0A6C] dark:text-[#2D27FF]"
              />
            </div>

            {/* Total Categories */}
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-neutral-700 dark:text-neutral-200">
                Total Categories
              </h2>
              <CountUp
                from={0}
                to={6}
                separator=","
                direction="up"
                duration={1}
                className="text-3xl font-bold text-[#FF0A6C] dark:text-[#2D27FF]"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CountMotion;
