import { getAllUsers, getUser } from "@/actions/user-actions";
import { fallbackAvatar, formattedDate } from "@/components/BlogSection";
import DeleteUserBtn from "@/components/DeleteUserBtn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { creator } from "../blog/page";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default async function UsersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return;

  const users = await getAllUsers();
  const specificUser = await getUser(session.user.id);

  const words = [
    {
      text: "Blog-Studio",
      className: "text-red-500 dark:text-blue-600",
    },
    {
      text: "Users",
    },
  ];

  const generateWords = "These are all the users who joined Blog Studio";

  return (
    <div className="px-4 mt-10">
      <div className="container flex flex-col justify-center items-center">
        <TypewriterEffectSmooth
          words={words}
          className="text-center text-3xl sm:text-5xl font-bold px-2"
          cursorClassName="bg-red-500 dark:bg-blue-600"
        />
        <TextGenerateEffect
          className="text-center text-lg sm:text-2xl font-semibold"
          words={generateWords}
        />

        <div className="flex items-center justify-center mt-6 gap-4">
          <HoverBorderGradient className="px-3 sm:px-4 py-2">
            <div className="flex items-center gap-2">
              <i className="ri-vip-crown-fill text-yellow-400"></i>
              <p>
                = <span className="ml-1 font-medium">Creator</span>
              </p>
            </div>
          </HoverBorderGradient>
          <HoverBorderGradient className="px-4 py-2">
            <div className="flex items-center gap-2">
              <i className="ri-vip-crown-fill text-gray-200"></i>
              <p>
                = <span className="ml-1 font-medium">Admin</span>
              </p>
            </div>
          </HoverBorderGradient>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-12 max-w-4xl w-full mx-auto">
        {users.map((user) => (
          <Card
            key={user.id}
            className="border-neutral-300 border-2 dark:border-neutral-500"
          >
            <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 py-6 px-3.5">
              <div className="flex items-center gap-2.5">
                <Avatar className="size-12 cursor-pointer">
                  <AvatarImage src={user.image!} />
                  <AvatarFallback className="bg-red-500 dark:bg-blue-600 text-white">
                    {fallbackAvatar(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <p>{user.name}</p>
                    {user.role === "Admin" && (
                      <i
                        className={`ri-vip-crown-fill ${
                          user.email === creator
                            ? "text-yellow-400"
                            : "text-gray-200"
                        }  ml-2`}
                      ></i>
                    )}
                    <p className="ml-2 text-xs text-neutral-500 dark:text-neutral-400 max-[450px]:hidden">
                      <span className="mr-2">•</span> joined in{" "}
                      {formattedDate(user.createdAt)}
                    </p>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {user.email}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 hidden max-[450px]:block">
                    Joined in {formattedDate(user.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <Button asChild size="sm">
                  <Link href={`/profile/${user.id}`} className="font-semibold">
                    Visit Profile
                  </Link>
                </Button>
                {specificUser?.role === "Admin" && user.role !== "Admin" && (
                  <DeleteUserBtn userId={user.id} redirectPath="/users" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// •
