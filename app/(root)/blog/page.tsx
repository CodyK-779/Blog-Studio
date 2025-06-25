import BlogSection from "@/components/BlogSection";
import FilterSection from "@/components/FilterSection";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function BlogPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const createRestrict = session ? "/blog/create" : "/login";

  return (
    <div className="pt-24 cm:pt-32 px-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl cm:text-6xl font-bold mb-6 text-center">
          Welcome to{" "}
          <span className="text-red-500 dark:text-blue-600">Next-blog</span>
        </h1>
        <h3 className="text-2xl cm:text-3xl font-semibold text-center mb-6 cm:w-[800px]">
          A place where creators share their works and let people know their
          talent and hard work
        </h3>
        <div className="flex items-center justify-center gap-4">
          <Button
            size="lg"
            asChild
            className="font-semibold text-md bg-red-500 hover:bg-red-600 dark:bg-blue-600 dark:text-black dark:hover:bg-blue-700 transition-colors duration-150 ease-in"
          >
            <Link href={createRestrict}>Get Started</Link>
          </Button>
          <Button size="lg" className="font-semibold text-md">
            Explore
          </Button>
        </div>
      </div>
      <FilterSection />
    </div>
  );
}
