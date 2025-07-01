"use client";

import { useSession } from "@/lib/auth-client";
import { HeartIcon, MessageCircle } from "lucide-react";
import DeleteBlogBtn from "./DeleteBlogBtn";
import { useState } from "react";
import Link from "next/link";
import { toggleLike } from "@/actions/post-actions";
import { CurrentUser, PostWithRelations } from "@/actions/post-type";

interface Props {
  post: PostWithRelations;
  currentUser: CurrentUser;
}

const LikeAndComment = ({ post, currentUser }: Props) => {
  const { data: session } = useSession();
  const [isLiking, setIsLiking] = useState(false);
  const [updateLike, setUpdateLike] = useState(post._count.like);
  const [hasLiked, setHasLiked] = useState(
    post.like.some((like) => like.userId === session?.user.id)
  );

  const handleLike = async (postId: string) => {
    setIsLiking(true);

    try {
      const results = await toggleLike(postId);

      if (results?.success) {
        setHasLiked(!hasLiked);
        setUpdateLike((prev) => prev + (hasLiked ? -1 : 1));
      }
    } catch (error) {
      setUpdateLike(post._count.like);
      setHasLiked(post.like.some((like) => like.userId === session?.user.id));
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="flex items-center justify-between mt-4 px-4 pb-4 border-b-2 border-neutral-300 dark:border-neutral-600">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleLike(post.id)}
            disabled={isLiking}
            className="cursor-pointer"
          >
            <HeartIcon
              className={`transition-colors duration-150 ease-in ${
                post.like.some((like) => like.userId === session?.user.id) &&
                "text-red-500 fill-red-500"
              }`}
            />
          </button>
          <p className="text-sm">{post._count.like}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="#comment">
            <MessageCircle className="cursor-pointer" />
          </Link>
          <p className="text-sm">{post._count.comment}</p>
        </div>
      </div>
      {currentUser &&
        (currentUser.role === "Admin" || currentUser.id === post.author.id) && (
          <DeleteBlogBtn postId={post.id} redirectPath="/blog/library" />
        )}
    </div>
  );
};

export default LikeAndComment;
