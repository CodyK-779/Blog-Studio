"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";

const BackNavigateBtn = () => {
  const router = useRouter();

  const navigate = () => {
    router.back();
  };

  return (
    <Button
      onClick={navigate}
      className="flex items-center gap-2 font-semibold w-fit mb-6"
    >
      <ArrowLeftIcon />
      Back
    </Button>
  );
};

export default BackNavigateBtn;
