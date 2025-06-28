import FuzzyText from "@/components/ui/FuzzyText";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { MoveLeftIcon } from "lucide-react";
import logo from "@/public/camera.png";
import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 overflow-hidden">
      <div className=" px-4">
        <div className="flex flex-col items-center justify-center text-white">
          <FuzzyText>404</FuzzyText>
          <h1 className="text-center mt-6 text-5xl font-semibold">
            There's Nothing here...
          </h1>
          <p className="text-center text-lg font-medium mt-4 mb-8">
            The page you're looking for doesn't exist go back and carefully
            search your Fucking page again
          </p>
          <HoverBorderGradient className="px-4 py-3 text-white">
            <Link href="/blog" className="flex items-center gap-2">
              <MoveLeftIcon />
              Back to Next-Blog
              <Image src={logo} alt="logo" className="size-5" />
            </Link>
          </HoverBorderGradient>
        </div>
      </div>
    </div>
  );
}
