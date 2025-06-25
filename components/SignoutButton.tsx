"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
      size="sm"
      variant="destructive"
      disabled={isPending}
      className="font-medium"
    >
      {isPending ? "Loading..." : "Sign Out"}
    </Button>
  );
};

export default SignoutButton;
