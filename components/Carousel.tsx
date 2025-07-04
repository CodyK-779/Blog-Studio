import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import GradientText from "./ui/GradientText";

const carouselData = [
  {
    category: "Art",
    title: "Where imagination meets the canvas.",
    image: "/Art.jpeg",
  },
  {
    category: "Games",
    title: "The art behind your favorite games.",
    image: "/games.jpg",
  },
  {
    category: "Movies",
    title: "Where imagination meets the canvas.",
    image: "/movies.jpg",
  },
  {
    category: "Cars",
    title: "Cinematic Cars in Artistic Motion.",
    image: "/Cars.jpg",
  },
  {
    category: "Memes",
    title: "Share dumb and funny memes.",
    image: "/memes.jpg",
  },
  {
    category: "Food",
    title: "Share amazing looking foods.",
    image: "/foods.jpg",
  },
];

const CarouselSection = () => {
  return (
    <div className="mt-0 md:mt-24 bg-neutral-50 dark:bg-black min-h-screen">
      <div className="container pt-16 pb-20">
        <GradientText className="md:text-5xl sm:text-4xl text-3xl font-bold mb-14 px-2">
          Explore different categories
        </GradientText>
        <Carousel>
          <CarouselContent>
            {carouselData.map((item) => (
              <CarouselItem
                key={item.category}
                className="lg:basis-1/3 sm:basis-1/2 basis-full mr-2"
              >
                <div
                  className="relative h-[500px] rounded-3xl overflow-hidden bg-cover bg-center flex items-end p-6 text-white"
                  style={{
                    backgroundImage: `url(${item.image})`,
                  }}
                >
                  <div className="z-10">
                    <p className="text-sm font-semibold">{item.category}</p>
                    <h2 className="text-2xl font-bold">{item.title}</h2>
                  </div>
                  <div className="absolute inset-0 bg-black/40 z-0" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="bg-neutral-800 hover:bg-neutral-900 hover:text-white text-white" />
          <CarouselPrevious className="bg-neutral-800 hover:bg-neutral-900 hover:text-white text-white" />
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselSection;
