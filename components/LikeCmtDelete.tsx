"use client";

import { CommentWithRelations } from "@/actions/comment-type";
import { deleteComment, toggleCmtLike } from "@/actions/comment.action";
import { UserDetail } from "@/actions/post-type";
import { useSession } from "@/lib/auth-client";
import { HeartIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  user: UserDetail;
  comment: CommentWithRelations;
  postId: string;
  authorId: string;
}

const LikeCmtDelete = ({ user, comment, postId, authorId }: Props) => {
  const { data: session } = useSession();

  if (!session) return null;

  const router = useRouter();
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updateLike, setUpdateLike] = useState(comment._count.likes);
  const [hasLiked, setHasLiked] = useState(
    comment.likes.some((like) => like.userId === session.user.id)
  );

  const handleLike = async (commentId: string) => {
    setIsLiking(true);

    try {
      const results = await toggleCmtLike(commentId, postId);

      if (results?.success) {
        setHasLiked(!hasLiked);
        setUpdateLike((prev) => prev + (hasLiked ? -1 : 1));
      }
    } catch (error) {
      setHasLiked(
        comment.likes.some((like) => like.userId === session.user.id)
      );
      setUpdateLike(comment._count.likes);
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const results = await deleteComment(comment.id);

      if (results?.success) {
        toast.success("Comment deleted successfully!");
        router.push(`/blog/${postId}`);
      }
    } catch (error) {
      console.error("Failed to delete comment");
      toast.error("Failed to delete comment");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-4 sm:pl-12 mt-4 sm:mt-1">
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleLike(comment.id)}
          disabled={isLiking}
          className="cursor-pointer"
        >
          <HeartIcon
            className={`transition-colors duration-150 ease-in ${
              comment.likes.some((like) => like.userId === session?.user.id) &&
              "text-red-500 fill-red-500"
            }`}
          />
        </button>
        <p className="text-sm">{comment._count.likes}</p>
      </div>
      {(user?.role === "Admin" ||
        comment.author.id === session.user.id ||
        authorId === session.user.id) && (
        <button
          className="cursor-pointer"
          disabled={isDeleting}
          onClick={handleDelete}
        >
          <Trash2Icon size="20" />
        </button>
      )}
    </div>
  );
};

export default LikeCmtDelete;
