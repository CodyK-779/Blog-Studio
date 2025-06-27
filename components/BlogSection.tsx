import { Categories } from "@/lib/generated/prisma";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { FilterType } from "./FilterSection";
import { getPost } from "@/actions/post-actions";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { format } from "date-fns";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUser } from "@/actions/user-actions";
import DeleteBlogBtn from "./DeleteBlogBtn";

interface Props {
  selectedCategory?: Categories;
  selectedFilter: FilterType;
}

const badgeType = (category: string) => {
  if (category === "Cars") {
    return (
      <Badge variant="secondary" className="bg-blue-600 text-white">
        Cars
      </Badge>
    );
  } else if (category === "Foods") {
    return (
      <Badge variant="secondary" className="bg-green-500 text-white">
        Foods
      </Badge>
    );
  } else if (category === "Games") {
    return (
      <Badge variant="default" className="bg-red-500 text-white">
        Games
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
  const posts = await getPost(selectedFilter, selectedCategory);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const currentUser = session ? await getUser(session.user.id) : null;

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      id="blog-section"
    >
      {posts.map((post) => (
        <Link
          href={`/blog/${post.id}`}
          key={post.id}
          className=" border-neutral-300 border-2 dark:border-neutral-600 shadow-lg rounded-md dark:bg-neutral-800 hover:shadow-xl hover:-translate-y-2 cursor-pointer transition-transform duration-150 ease-in"
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
                    <i className="ri-vip-crown-fill text-yellow-400"></i>
                  )}
                </div>
                <p>{formattedDate(post.createdAt)}</p>
              </div>
            </div>
            {post.categories && badgeType(post.categories)}
          </div>
          {post.image && (
            <Image
              src={post.image}
              alt="image"
              width={1000}
              height={300}
              className="object-cover"
            />
          )}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold mb-1 text-red-500 dark:text-blue-600">
                {post.title}
              </p>
              {currentUser && currentUser.role === "Admin" && (
                <DeleteBlogBtn postId={post.id} />
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
  );
};

export default BlogSection;
