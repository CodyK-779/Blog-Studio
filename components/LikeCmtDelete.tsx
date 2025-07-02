"use client";

import {
  CommentWithRelations,
  ReplyWithRelations,
} from "@/actions/comment-type";
import { deleteComment, toggleCmtLike } from "@/actions/comment.action";
import { UserDetail } from "@/actions/post-type";
import { useSession } from "@/lib/auth-client";
import { HeartIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface Props {
  user: UserDetail;
  comment: CommentWithRelations | ReplyWithRelations;
  postId: string;
  authorId: string;
  small?: boolean;
}

const LikeCmtDelete = ({ user, comment, postId, authorId, small }: Props) => {
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
              small && "size-[22px]"
            } ${
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="cursor-pointer" disabled={isDeleting}>
              <Trash2Icon size="20" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this comment? This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-black hover:bg-neutral-800 hover:text-white text-white dark:bg-white dark:hover:bg-opacity-90 dark:text-black">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white"
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default LikeCmtDelete;
