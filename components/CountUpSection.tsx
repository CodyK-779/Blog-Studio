import { Card, CardContent, CardHeader } from "./ui/card";
import { prisma } from "@/lib/prisma";
import CountUp from "./ui/CountUp";
import GradientText from "./ui/GradientText";

const CountUpSection = async () => {
  const posts = await prisma.post.count();
  const users = await prisma.user.count();

  return (
    <div className="container py-16">
      <GradientText className="max-[370px]:text-3xl text-4xl md:text-5xl font-bold px-2 text-center mb-12">
        Community Stats
      </GradientText>

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
    </div>
  );
};

export default CountUpSection;

/*
<div className="container py-8">
      <GradientText className="max-[370px]:text-3xl text-4xl md:text-5xl font-bold px-2 text-center mb-10">
        Community Stats
      </GradientText>
      <Card className="md:max-w-5xl mx-auto border-neutral-300 border-2 dark:border-neutral-600">
        <CardContent className="py-5">
          <div className="flex justify-between px-6 mt-4 pb-4 items-center gap-4">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-lg sm:text-2xl font-semibold text-center">
                Total Blogs
              </h1>
              <CountUp
                from={0}
                to={posts}
                separator=","
                direction="up"
                duration={1}
                className="text-2xl font-bold text-red-500 dark:text-blue-600"
              />
            </div>

            <div className="flex flex-col items-center gap-4">
              <h1 className="text-lg sm:text-2xl font-semibold text-center">
                Total Users
              </h1>
              <CountUp
                from={0}
                to={users}
                separator=","
                direction="up"
                duration={1}
                className="text-2xl font-bold text-red-500 dark:text-blue-600"
              />
            </div>

            <div className="flex flex-col items-center gap-4">
              <h1 className="text-lg sm:text-2xl font-semibold text-center">
                Total Categories
              </h1>
              <CountUp
                from={0}
                to={6}
                separator=","
                direction="up"
                duration={1}
                className="text-2xl font-bold text-red-500 dark:text-blue-600"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
*/
