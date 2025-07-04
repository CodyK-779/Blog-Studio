"use client";

import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

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
    image: "/megamind.jpg",
  },
  {
    category: "Food",
    title: "Share amazing looking foods.",
    image: "/foods.jpg",
  },
];

const CarouselMotion = () => {
  return (
    <motion.div
      initial={{ x: 80, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
    >
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
    </motion.div>
  );
};

export default CarouselMotion;
