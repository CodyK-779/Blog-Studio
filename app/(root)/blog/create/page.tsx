import CreateForm from "@/components/CreateForm";
import GradientText from "@/components/ui/GradientText";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

const words = [
  {
    text: "Create",
  },
  {
    text: "your",
  },
  {
    text: "Blog",
    className: "text-red-500 dark:text-blue-600",
  },
  {
    text: "post",
  },
  {
    text: "here",
  },
];

export default function CreatePage() {
  return (
    <div className="pt-24">
      <div className="flex flex-col items-center justify-center">
        <TypewriterEffectSmooth
          words={words}
          className="max-[360px]:text-[22px] max-[460px]:text-2xl text-3xl md:text-4xl lg:text-6xl font-bold px-2 text-center"
          cursorClassName="bg-red-500 dark:bg-blue-600"
        />
        <div className="flex items-center gap-2 mt-1">
          <h3 className="text-2xl md:text-3xl font-semibold text-center">
            Share your
          </h3>
          <GradientText className="text-2xl md:text-3xl font-bold text-center">
            creativity
          </GradientText>
        </div>
      </div>
      <div className="mt-10 max-w-2xl w-full mx-auto">
        <CreateForm />
      </div>
    </div>
  );
}
