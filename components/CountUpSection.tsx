import { Card, CardContent, CardHeader } from "./ui/card";
import { prisma } from "@/lib/prisma";
import CountUp from "./ui/CountUp";

const CountUpSection = async () => {
  const posts = await prisma.post.count();
  const users = await prisma.user.count();

  return (
    <div className="container mt-10 py-8">
      <Card className="max-w-5xl mx-auto border-neutral-300 border-2 dark:border-neutral-600">
        <CardHeader>
          <h1 className="text-center font-bold text-3xl text-red-500 dark:text-blue-600">
            Community Stats
          </h1>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between px-6 mt-4 pb-4">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-2xl font-semibold">Total Blogs</h1>
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
              <h1 className="text-2xl font-semibold">Total Users</h1>
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
              <h1 className="text-2xl font-semibold">Total Categories</h1>
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
  );
};

export default CountUpSection;
