"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

const SignoutButton = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    await signOut({
      fetchOptions: {
        onRequest: () => setIsPending(true),
        onResponse: () => {
          setIsPending(false);
        },
        onError: (cxt) => {
          toast.error(cxt.error.message);
        },
        onSuccess: () => {
          toast.success("User Signed out successfully!");
          router.push("/login");
        },
      },
    });
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
      className="font-medium bg-red-500 hover:bg-red-600 flex items-center text-white w-fit gap-2"
    >
      {isPending ? (
        <>
          <Loader2Icon className="animate-spin" />
          Loading...
        </>
      ) : (
        <>Sign Out</>
      )}
    </Button>
  );
};

export default SignoutButton;
