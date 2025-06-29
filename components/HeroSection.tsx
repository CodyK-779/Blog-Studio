import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import HeroButtons from "./HeroButtons";
import { BackgroundLines } from "./ui/background-lines";

const HeroSection = () => {
  const typeEffectSyles =
    "text-2xl min-[500px]:text-4xl cm:text-6xl font-bold text-center z-10";

  const mainWords = [
    {
      text: "Welcome",
    },
    {
      text: "to",
    },
    {
      text: "Blog-Studio",
      className: "text-red-500 dark:text-blue-600",
    },
  ];

  const words =
    "A place where creators share their works and let people know their talent and hard work";
  const wordsStyle =
    "text-lg min-[500px]:text-2xl cm:text-3xl font-semibold text-center mb-6 cm:w-[800px] z-10 px-2";

  return (
    <BackgroundLines className="flex flex-col items-center justify-center">
      <TypewriterEffectSmooth
        words={mainWords}
        className={typeEffectSyles}
        cursorClassName="bg-red-500 dark:bg-blue-600"
      />
      <TextGenerateEffect words={words} className={wordsStyle} />
      <HeroButtons />
    </BackgroundLines>
  );
};

export default HeroSection;
