import { Categories } from "@/lib/generated/prisma";
import { FilterType } from "./FilterSection";
import { getPost } from "@/actions/post-actions";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUser } from "@/actions/user-actions";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { badgeType, fallbackAvatar, formattedDate } from "./BlogSection";
import DeleteBlogBtn from "./DeleteBlogBtn";
import { creator } from "@/app/(root)/blog/page";

interface Props {
  selectedCategory?: Categories;
  selectedFilter: FilterType;
}

const BlogLibraryList = async ({ selectedCategory, selectedFilter }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  const posts = await getPost(selectedFilter, selectedCategory, false);
  const currentUser = session ? await getUser(session.user.id) : null;

  return (
    <div className="container">
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                          } `}
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
                  {currentUser && currentUser.role === "Admin" && (
                    <DeleteBlogBtn
                      postId={post.id}
                      imageUrl={post.image}
                      redirectPath="/blog/library"
                    />
                  )}
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
      ) : (
        <p className="text-xl font-semibold text-center mt-40">
          No blogs have been posted yet
        </p>
      )}
    </div>
  );
};

export default BlogLibraryList;
