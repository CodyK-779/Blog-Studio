"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession } from "@/lib/auth-client";
import { Textarea } from "./ui/textarea";
import { Loader2Icon } from "lucide-react";
import { createReply } from "@/actions/comment.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  postId: string;
  commentId: string;
  activeReplyId: string | null;
  setActiveReplyId: (id: string | null) => void;
}

const ReplyCommentField = ({
  postId,
  commentId,
  activeReplyId,
  setActiveReplyId,
}: Props) => {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const { data: session } = useSession();

  const isOpen = activeReplyId === commentId;

  if (!session) return null;

  const fallbackAvatar = session && session.user.name.charAt(0).toUpperCase();

  const handleSubmit = async () => {
    setIsCommenting(true);

    try {
      const results = await createReply(postId, comment, commentId);

      if (results?.success) {
        setComment("");
        toast.success("Added reply successfully!");
        setActiveReplyId(null);
        router.push(`/blog/${postId}`, { scroll: false });
      }
    } catch (error) {
      toast.error("Failed to add reply");
      console.error("Failed to add reply");
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <p
          className="text-xs font-medium text-neutral-500 dark:text-neutral-400 cursor-pointer"
          onClick={() => setActiveReplyId(commentId)}
        >
          Reply
        </p>
      )}
      {isOpen && (
        <div className="flex gap-3 items-start pt-8 w-full">
          <div>
            <Avatar className="size-8">
              <AvatarImage src={session.user.image!} />
              <AvatarFallback className="bg-red-500 dark:bg-blue-600 text-white">
                {fallbackAvatar}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border-2 border-neutral-300 dark:border-neutral-600 h-32"
              placeholder="Add a comment..."
            />
            <div className="flex items-center justify-end gap-4 px-4">
              <button
                className="px-3 py-1 text-xs rounded-lg font-semibold bg-black dark:bg-white text-white dark:text-black"
                onClick={() => {
                  setActiveReplyId(null);
                  setComment("");
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!comment.trim() || isCommenting}
                className={`px-3 py-1 text-xs rounded-lg font-semibold bg-black dark:bg-white text-white dark:text-black cursor-pointer ${
                  !comment.trim() && "opacity-50"
                }`}
              >
                {isCommenting ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Add"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReplyCommentField;
