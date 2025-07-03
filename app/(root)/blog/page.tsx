import BlogSection from "@/components/BlogSection";
import Carousel from "@/components/Carousel";
import CountUpSection from "@/components/CountUpSection";
import FilterSection, { FilterType } from "@/components/FilterSection";
import HeroSection from "@/components/HeroSection";
import Kanye from "@/components/Kanye";
import Parallax from "@/components/Parallax";
import Testimonials from "@/components/Testimonials";
import { Categories } from "@/lib/generated/prisma";

export const creator = "khantzawthein81@gmail.com";

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
      <CountUpSection />
      <Kanye />
      <Testimonials />
    </div>
  );
}
