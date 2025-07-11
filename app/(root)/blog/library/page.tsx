import BlogLibraryList from "@/components/BlogLibraryList";
import FilterSection, { FilterType } from "@/components/FilterSection";
import GradientText from "@/components/ui/GradientText";
import { SparklesCore } from "@/components/ui/sparkles";
import { Categories } from "@/lib/generated/prisma";

export default async function BlogLibrary({
  searchParams,
}: {
  searchParams: Promise<{ category?: Categories; filter: FilterType }>;
}) {
  const selectedCategory = (await searchParams).category;
  const selectedFilter = (await searchParams).filter;

  return (
    <div className="min-h-screen">
      {/* For darkmode */}
      <div className="container pt-12 w-full hidden dark:flex flex-col items-center justify-center overflow-hidden rounded-md">
        <GradientText className="text-5xl sm:text-7xl font-bold text-center relative">
          Blog Library
        </GradientText>

        {/* <h1 className="text-5xl sm:text-7xl font-bold text-center relative">
          Blog Library
        </h1> */}
        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full dark:bg-neutral-950 [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>

      {/* For Lightmode */}
      <GradientText className="dark:hidden pt-12 text-5xl sm:text-7xl font-bold text-center">
        Blog Library
      </GradientText>
      <p className="dark:hidden text-3xl text-center font-semibold mt-2 px-2">
        You can find random cool shit here
      </p>

      <div className="mt-40 dark:mt-10">
        <FilterSection />
      </div>
      <BlogLibraryList
        selectedCategory={selectedCategory}
        selectedFilter={selectedFilter}
      />
    </div>
  );
}
