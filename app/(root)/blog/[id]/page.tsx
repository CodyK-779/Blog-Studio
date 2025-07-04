import { getPostDetails, getPostId } from "@/actions/post-actions";
import { getUser } from "@/actions/user-actions";
import {
  badgeType,
  fallbackAvatar,
  formattedDate,
} from "@/components/BlogSection";
import CommentField from "@/components/CommentField";
import CommentSection from "@/components/CommentSection";
import LikeAndComment from "@/components/like-comment";
import PostDetailImage from "@/components/PostDetailImage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Categories } from "@/lib/generated/prisma";
import { ArrowLeft } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { creator } from "../page";

export default async function BlogPageDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const postId = (await params).id;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const idCheck = await getPostId(postId);

  if (!idCheck) {
    return notFound();
  }

  const posts = await getPostDetails(postId);

  const currentUser = session ? await getUser(session.user.id) : null;
  const user = await getUser(session.user.id);

  const titleColor = (category: Categories | null) => {
    if (category === "Art") return "text-yellow-400";
    if (category === "Cars") return "text-blue-600";
    if (category === "Foods") return "text-green-500";
    if (category === "Games") return "text-red-500";
    if (category === "Movies") return "text-purple-600";
    if (category === "Memes") return "text-orange-500";
    return "text-white";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 w-full flex flex-col justify-center pt-10">
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <Button className="w-fit mb-12" asChild>
              <Link
                href="/blog/library"
                className="flex items-center gap-2 font-semibold"
              >
                <ArrowLeft /> Library
              </Link>
            </Button>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 mb-4">
                <Link href={`/profile/${post.author.id}`}>
                  <Avatar className="size-10 sm:size-14">
                    <AvatarImage
                      src={post.author.image!}
                      alt={post.author.name}
                    />
                    <AvatarFallback className="bg-red-500 dark:bg-blue-600 text-white">
                      {fallbackAvatar(post.author.name)}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm sm:text-base">
                      {post.author.name}
                    </p>
                    {post.author.role === "Admin" && (
                      <i
                        className={`ri-vip-crown-fill ${
                          post.author.email === creator
                            ? "text-yellow-400"
                            : "text-gray-200"
                        }`}
                      ></i>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-300">
                    Created in {formattedDate(post.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {post.categories && badgeType(post.categories, true)}
              </div>
            </div>

            <PostDetailImage postImage={post.image} postTitle={post.title} />
            <LikeAndComment post={post} currentUser={currentUser} />
            <h1
              className={`max-[400px]:text-xl text-2xl sm:text-4xl font-semibold pt-4 mb-2 ${titleColor(
                post.categories
              )}`}
            >
              {post.title}
            </h1>
            {post.subTitle && (
              <h3 className="text-lg sm:text-xl font-semibold">
                {post.subTitle}
              </h3>
            )}
            <p className="text-sm pt-4 pb-6 border-b-2 border-neutral-300 dark:border-neutral-600">
              {post.content}
            </p>
            <CommentField postId={post.id} />
            <CommentSection
              user={user}
              authorId={post.author.id}
              postId={post.id}
              comments={post.comment}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
