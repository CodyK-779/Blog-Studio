import { prisma } from "@/lib/prisma";
import GradientText from "./ui/GradientText";
import CountMotion from "./CountMotion";

const CountUpSection = async () => {
  const posts = await prisma.post.count();
  const users = await prisma.user.count();

  return (
    <div className="container py-16">
      <GradientText className="max-[350px]:text-2xl max-[370px]:text-3xl text-4xl md:text-5xl font-bold px-2 text-center mb-12">
        Community Stats
      </GradientText>

      <CountMotion users={users} posts={posts} />
    </div>
  );
};

export default CountUpSection;
