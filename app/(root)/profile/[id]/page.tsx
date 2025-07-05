import { getUser, getUserId } from "@/actions/user-actions";
import { fallbackAvatar, formattedDate } from "@/components/BlogSection";
import DeleteUserBtn from "@/components/DeleteUserBtn";
import SignoutButton from "@/components/SignoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import GradientText from "@/components/ui/GradientText";
import UserBlogPosts from "@/components/UserBlogPosts";
import { auth } from "@/lib/auth";
import { ArrowLeftIcon, CalendarDays } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { creator } from "../../blog/page";
import { notFound } from "next/navigation";
import BackNavigateBtn from "@/components/BackNavigateBtn";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userCheck = await getUserId(userId);
  if (!userCheck) {
    return notFound();
  }

  if (!session) return null;

  const user = await getUser(userId);
  const currentUser = await getUser(session.user.id);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-1 sm:px-4">
      <h1 className="text-5xl font-bold text-center mt-10 text-red-500 dark:text-blue-600">
        User Profile
      </h1>
      <div className="max-w-3xl mx-auto w-full px-4 flex flex-col justify-center py-12">
        {/* <Button className="w-fit mb-6" asChild>
          <Link href="/blog" className="flex items-center gap-2 font-semibold">
            <ArrowLeftIcon />
            Home
          </Link>
        </Button> */}
        <BackNavigateBtn />
        <Card className="border-neutral-300 border-2 dark:border-neutral-500">
          {user.email === "khantzawthein81@gmail.com" && (
            <CardHeader className="flex items-center justify-center">
              <GradientText className="font-bold text-3xl">
                Creator
              </GradientText>
            </CardHeader>
          )}
          <CardContent className="flex flex-col justify-center py-4">
            <div className="flex items-center justify-between">
              <Avatar className="size-14 sm:size-20 cursor-pointer">
                <AvatarImage src={user.image!} />
                <AvatarFallback className="bg-red-500 dark:bg-blue-600 text-white">
                  {fallbackAvatar(user.name)}
                </AvatarFallback>
              </Avatar>
              {user.id === session.user.id && <SignoutButton />}
            </div>
            <div className="flex items-center mt-2">
              <h3 className="font-semibold text-lg sm:text-xl">{user.name}</h3>
              {user.role === "Admin" && (
                <div className="flex items-center gap-2">
                  <i
                    className={`ri-vip-crown-fill ${
                      user.email === creator
                        ? "text-yellow-400"
                        : "text-gray-200"
                    } ml-2`}
                  ></i>
                  <p className="text-sm font-semibold">
                    {user.email === "khantzawthein81@gmail.com"
                      ? "Creator"
                      : "Admin"}
                  </p>
                </div>
              )}
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              {user.email}
            </p>
            <p className="flex items-center gap-2 mt-2 text-sm font-medium text-neutral-500 dark:text-neutral-200">
              <CalendarDays className="size-4" />
              Joined in {formattedDate(user.createdAt)}
            </p>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-300 font-medium">
              <span className="text-neutral-600 dark:text-white text-base font-semibold ml-0.5">
                {user._count.post}
              </span>{" "}
              Posts created
            </p>
            <div className="flex items-center mt-2 gap-2">
              <p className="max-[460px]:text-sm font-semibold dark:text-neutral-200">
                Follow on other socials
              </p>
              <p className="max-[460px]:hidden text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {"(This doesn't work lol)"}
              </p>
            </div>
            <div className="flex items-center mt-2 gap-3">
              <i className="ri-github-fill text-2xl cursor-pointer"></i>
              <i className="ri-facebook-circle-fill text-2xl cursor-pointer"></i>
              <i className="ri-twitter-x-line text-xl cursor-pointer"></i>
              <i className="ri-instagram-line text-xl cursor-pointer"></i>
            </div>
          </CardContent>
          {(currentUser?.role === "Admin" || user.id === session.user.id) && (
            <CardFooter>
              <DeleteUserBtn userId={user.id} text redirectPath="/blog" />
            </CardFooter>
          )}
        </Card>
      </div>
      <div className="w-full border-t-2 border-neutral-300 dark:border-neutral-500 px-1">
        {user._count.post > 0 ? (
          <UserBlogPosts userId={user.id} />
        ) : (
          <p className="text-center text-neutral-600 dark:text-neutral-400 px-2 font-semibold mt-32">
            This user haven't created any blog yet
          </p>
        )}
      </div>
    </div>
  );
}
