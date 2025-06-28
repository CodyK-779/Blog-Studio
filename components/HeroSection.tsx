import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import HeroButtons from "./HeroButtons";
import { BackgroundLines } from "./ui/background-lines";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";

const HeroSection = () => {
  const typeEffectSyles =
    "text-2xl min-[500px]:text-4xl cm:text-6xl font-bold text-center z-10";

  const words =
    "A place where creators share their works and let people know their talent and hard work";
  const wordsStyle =
    "text-xl sm:text-2xl cm:text-3xl font-semibold text-center mb-6 cm:w-[800px] z-10";

  return (
    <BackgroundLines className="flex flex-col items-center justify-center">
      <TypewriterEffectSmooth
        className={typeEffectSyles}
        cursorClassName="bg-red-500 dark:bg-blue-600"
      />
      <TextGenerateEffect words={words} className={wordsStyle} />
      <HeroButtons />
    </BackgroundLines>

    // <div className="flex flex-col items-center justify-center">
    //   <BackgroundBeamsWithCollision className="overflow-hidden">
    //     <TypewriterEffectSmooth
    //       className={typeEffectSyles}
    //       cursorClassName="bg-red-500 dark:bg-blue-600"
    //     />
    //     <TextGenerateEffect words={words} className={wordsStyle} />
    //   </BackgroundBeamsWithCollision>
    //   <HeroButtons />
    // </div>
  );
};

export default HeroSection;
