"use client";

import SignInAction from "@/actions/sign-in-action";
import SignUpOauthButton from "@/actions/signup-oauth-btn";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const { error } = await SignInAction(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success("User Logged in successfully!");
      router.push("/blog");
      setIsLoading(false);
    }
  };

  const inputBorder = "border-2 border-neutral-300 dark:border-neutral-600";

  return (
    <div className="max-w-sm w-full">
      <div className="flex items-center justify-between mb-4">
        <Button asChild className="flex items-center gap-2">
          <Link href="/blog">
            <ArrowLeftIcon />
            Home
          </Link>
        </Button>
        <ModeToggle />
      </div>
      <Card className="dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-600">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            NextBlog
          </CardTitle>
          <CardDescription>
            <p className="text-center text-sm pt-1 font-semibold">
              Login to join the NextBlog
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4 border-b-2 border-neutral-300 dark:border-neutral-600">
          <form className="pt-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className={inputBorder}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className={inputBorder}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="font-medium mt-6 py-1.5 w-full"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
            <p className="pt-4 text-sm dark:text-neutral-400">
              Don't have an account?{" "}
              <Link href="/register" className="hover:underline">
                register
              </Link>
            </p>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pt-6">
          <SignUpOauthButton provider="google" />
          <SignUpOauthButton provider="github" />
        </CardFooter>
      </Card>
    </div>
  );
}
