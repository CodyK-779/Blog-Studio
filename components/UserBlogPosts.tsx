import { getUserPost } from "@/actions/post-actions";
import GradientText from "./ui/GradientText";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { fallbackAvatar, formattedDate, badgeType } from "./BlogSection";
import DeleteBlogBtn from "./DeleteBlogBtn";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUser } from "@/actions/user-actions";
import { creator } from "@/app/(root)/blog/page";

interface Props {
  userId: string;
}

const UserBlogPosts = async ({ userId }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;
  if (!userId) return null;

  const posts = await getUserPost(userId);
  const currentUser = await getUser(session.user.id);

  return (
    <div className="mt-12">
      <GradientText className="text-4xl text-center px-2 font-bold">
        All the blogs <br /> this user have created
      </GradientText>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-20">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.id}`}
            key={post.id}
            className="border-neutral-300 border-2 dark:border-neutral-600 shadow-lg rounded-lg dark:bg-neutral-900 hover:shadow-xl hover:-translate-y-2 cursor-pointer transition-transform duration-150 ease-in"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-4">
                <Avatar className="cursor-pointer size-8">
                  <AvatarImage src={post.author.image!} />
                  <AvatarFallback className="bg-red-500 dark:bg-blue-600 text-white">
                    {fallbackAvatar(post.author.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm">
                  <div className="flex items-center gap-2">
                    <p>{post.author.name}</p>
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
                  <p>{formattedDate(post.createdAt)}</p>
                </div>
              </div>
              {post.categories && badgeType(post.categories)}
            </div>
            {post.image && (
              <div className="relative aspect-video w-full">
                <Image
                  src={post.image}
                  alt="image"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 1024px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-2xl font-semibold mb-1 text-red-500 dark:text-blue-600">
                  {post.title}
                </p>
                {post.author.id === currentUser?.id ||
                  (currentUser?.role === "Admin" && (
                    <DeleteBlogBtn
                      postId={post.id}
                      imageUrl={post.image}
                      redirectPath="/blog/library"
                    />
                  ))}
              </div>
              {post.subTitle && (
                <p className="font-medium mb-1 text-blue-600 dark:text-red-600">
                  {post.subTitle}
                </p>
              )}
              <p className="text-sm truncate max-w-[50ch]">{post.content}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserBlogPosts;
