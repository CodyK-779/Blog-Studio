"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  provider: "github" | "google";
  signUp?: boolean;
}

const SignUpOauthButton = ({ provider, signUp }: Props) => {
  const [isPending, setIsPending] = useState(false);
  const action = signUp ? "Up" : "In";
  const providerName = provider === "github" ? "Github" : "Google";

  const handleClick = async () => {
    await signIn.social({
      provider,
      callbackURL: "/blog",
      fetchOptions: {
        onRequest: () => setIsPending(true),
        onResponse: () => setIsPending(false),
        onError: (cxt) => {
          toast.error(cxt.error.message);
        },
        onSuccess: () => {
          toast.success(`Sign ${action} with ${providerName} successfully!`);
        },
      },
    });
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
      className="flex items-center gap-2 w-full py-1.5"
    >
      {isPending ? (
        "Loading..."
      ) : provider === "google" ? (
        <>
          <i className="ri-google-fill"></i>
          Sign {action} with {providerName}
        </>
      ) : (
        <>
          <i className="ri-github-fill text-lg"></i>
          Sign {action} with {providerName}
        </>
      )}
    </Button>
  );
};

export default SignUpOauthButton;
