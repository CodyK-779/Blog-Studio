import BlogSection from "@/components/BlogSection";
import Carousel from "@/components/Carousel";
import FilterSection, { FilterType } from "@/components/FilterSection";
import HeroSection from "@/components/HeroSection";
import Parallax from "@/components/Parallax";
import { Categories } from "@/lib/generated/prisma";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: Categories; filter: FilterType }>;
}) {
  const selectedCategory = (await searchParams).category;
  const selectedFilter = (await searchParams).filter;

  return (
    <div className="pt-24 cm:pt-32 overflow-hidden">
      <HeroSection />
      <FilterSection mt />
      <BlogSection
        selectedCategory={selectedCategory}
        selectedFilter={selectedFilter}
      />
      <Parallax />
      <Carousel />
    </div>
  );
}
