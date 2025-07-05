import { Categories } from "@/lib/generated/prisma";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { FilterType } from "./FilterSection";
import { getPost } from "@/actions/post-actions";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { format } from "date-fns";
import Link from "next/link";
import logo from "@/public/camera.png";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUser } from "@/actions/user-actions";
import DeleteBlogBtn from "./DeleteBlogBtn";
import GradientText from "./ui/GradientText";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { creator } from "@/app/(root)/blog/page";

interface Props {
  selectedCategory?: Categories;
  selectedFilter: FilterType;
}

export const badgeType = (category: string, padding?: boolean) => {
  if (category === "Cars") {
    return (
      <Badge
        variant="secondary"
        className={`bg-blue-600 text-white ${
          padding && "font-semibold sm:text-sm sm:px-4 sm:py-1"
        }`}
      >
        Cars
      </Badge>
    );
  } else if (category === "Foods") {
    return (
      <Badge
        variant="secondary"
        className={`bg-green-500 text-white ${
          padding && "font-semibold sm:text-sm sm:px-4 sm:py-1"
        }`}
      >
        Foods
      </Badge>
    );
  } else if (category === "Games") {
    return (
      <Badge
        variant="default"
        className={`bg-red-500 text-white ${
          padding && "font-semibold sm:text-sm sm:px-4 sm:py-1"
        }`}
      >
        Games
      </Badge>
    );
  } else if (category === "Movies") {
    return (
      <Badge
        variant="default"
        className={`bg-purple-600 text-white ${
          padding && "font-semibold sm:text-sm sm:px-4 sm:py-1"
        }`}
      >
        Movies
      </Badge>
    );
  } else if (category === "Memes") {
    return (
      <Badge
        variant="default"
        className={`bg-orange-500 text-white ${
          padding && "font-semibold sm:text-sm sm:px-4 sm:py-1"
        }`}
      >
        Memes
      </Badge>
    );
  } else if (category === "Art") {
    return (
      <Badge
        variant="default"
        className={`bg-yellow-400 text-white ${
          padding && "font-semibold sm:text-sm sm:px-4 sm:py-1"
        }`}
      >
        Art
      </Badge>
    );
  }
};

export const formattedDate = (postDate: Date) => {
  return format(new Date(postDate), "MMMM d yyyy");
};

export const fallbackAvatar = (authorName: string) => {
  return authorName.charAt(0).toUpperCase();
};

const BlogSection = async ({ selectedCategory, selectedFilter }: Props) => {
  const posts = await getPost(selectedFilter, selectedCategory, true);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!posts) return null;

  const currentUser = session ? await getUser(session.user.id) : null;
  const restrictLibraryAccess = session ? "/blog/library" : "/login";

  return (
    <div className="container mb-10" id="blog-section">
      <div className="border-2 border-neutral-300 dark:border-neutral-600 py-8 pb-10 px-1.5 sm:px-4 rounded-xl">
        <GradientText className="font-semibold text-4xl text-center mb-12">
          Blog Section
        </GradientText>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border-neutral-300 border-2 dark:border-neutral-600 shadow-lg rounded-lg dark:bg-neutral-900 hover:shadow-xl hover:-translate-y-2 cursor-pointer transition-transform duration-150 ease-in"
              >
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-4">
                    <Link href={`/profile/${post.author.id}`}>
                      <Avatar className="cursor-pointer size-8">
                        <AvatarImage src={post.author.image!} />
                        <AvatarFallback className="bg-red-500 dark:bg-blue-600 text-white">
                          {fallbackAvatar(post.author.name)}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
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
                  <Link href={`/blog/${post.id}`}>
                    <div className="relative aspect-video w-full">
                      <Image
                        src={post.image}
                        alt="image"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 1024px"
                        className="object-cover"
                      />
                    </div>
                  </Link>
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <Link href={`/blog/${post.id}`}>
                      <p className="text-2xl font-semibold mb-1 text-red-500 dark:text-blue-600 truncate max-w-[20ch] hover:underline">
                        {post.title}
                      </p>
                    </Link>
                    {currentUser && currentUser.role === "Admin" && (
                      <DeleteBlogBtn
                        imageUrl={post.image}
                        postId={post.id}
                        redirectPath="/blog"
                      />
                    )}
                  </div>
                  {post.subTitle && (
                    <p className="font-medium mb-1 text-blue-600 dark:text-red-600 truncate max-w-[40ch]">
                      {post.subTitle}
                    </p>
                  )}
                  <p className="text-sm truncate max-w-[50ch]">
                    {post.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xl font-semibold text-center mt-12 mb-10">
            No blogs have been posted yet
          </p>
        )}

        {posts.length > 0 && (
          <div className="flex justify-center">
            <HoverBorderGradient className="px-4 py-2.5 text-white bg-neutral-800 dark:bg-neutral-900">
              <Link
                href={restrictLibraryAccess}
                className="flex items-center gap-2"
              >
                Show More
                <Image src={logo} alt="logo" className="size-5" />
              </Link>
            </HoverBorderGradient>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSection;
