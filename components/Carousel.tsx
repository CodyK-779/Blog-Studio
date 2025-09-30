import CarouselMotion from "./CarouselMotion";
import GradientText from "./ui/GradientText";

const CarouselSection = () => {
  return (
    <div className="mt-0 md:mt-24 bg-neutral-50 dark:bg-black min-h-screen">
      <div className="container pt-16 pb-20">
        <GradientText className="md:text-5xl sm:text-4xl min-[500px]:text-3xl min-[384px]:text-2xl text-xl font-bold sm:mb-14 mb-10 px-2">
          Explore different categories
        </GradientText>

        <CarouselMotion />
      </div>
    </div>
  );
};

export default CarouselSection;
