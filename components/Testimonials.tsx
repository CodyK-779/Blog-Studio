import { AnimatedTestimonials } from "./ui/animated-testimonials";
import GradientText from "./ui/GradientText";

const testimonials = [
  {
    quote:
      "Look, I ain't one for compliments, but this website? I’d even leave my swamp for it. Even Donkey couldn't find anything to complain about and that’s sayin’ something.",
    name: "Shrek",
    designation: "Real Estate agent but for Swamps",
    src: "/Shrek.jpg",
  },
  {
    quote:
      "This website is so mesmerizing. The Artstyles, the Games, the Movies Holy shit i can't even stop looking up at it.",
    name: "Willem Dafoe",
    designation: "Hidden identity: Green goblin",
    src: "/memes.jpg",
  },
  {
    quote:
      "This blog’s got more style than my one eye can handle! Clean layout, great posts, and unlike Sulley, it doesn’t snore when it loads!.",
    name: "Mike Wazowski",
    designation: "Scare Assistant worker at Monsters inc",
    src: "/mike.jpg",
  },
  {
    quote:
      "Omg where should i even start this website is as beautiful, handsome and charming as me. I can even post my handsome face and share it with people.",
    name: "Squidward",
    designation: "Works at Krusty krabs",
    src: "/squidward.jpg",
  },
  {
    quote:
      "Bla Bla Bla Bla Bla i have nothing to say other than i like this website such amazing design.",
    name: "Nelson",
    designation: "Works at Sushiro",
    src: "/nelson.jpg",
  },
  {
    quote:
      "This blog is absolutely incredible. People are talking about it—tremendous design, amazing content. I’ve seen a lot of blogs—believe me—and this one? It's the best. Everybody loves it.",
    name: "Donald Trump",
    designation: "President of the United States",
    src: "/trump.webp",
  },
  {
    quote:
      "After i order my nuclear scientists to invent some nukes i visit this website. It is so good, it almost distracted me from war!",
    name: "Kim Jong Uh",
    designation: "Supreme leader of North Korea",
    src: "/kim.jpeg",
  },
];

const Testimonials = () => {
  return (
    <div className="w-full mt-10">
      <div className="flex flex-col items-center justify-center mb-20">
        <GradientText className="text-4xl sm:text-6xl font-bold">
          Testimonials
        </GradientText>
        <p className="text-2xl sm:text-3xl font-medium text-center px-2">
          Here's what our users say about this website
        </p>
      </div>
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
};

export default Testimonials;
