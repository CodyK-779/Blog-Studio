"use client";

import { useSession } from "@/lib/auth-client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Loader2Icon } from "lucide-react";
import { createComment } from "@/actions/comment.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  postId: string;
}

const CommentField = ({ postId }: Props) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState("");
  const router = useRouter();

  const { data: session } = useSession();

  if (!session) return null;

  const fallbackAvatar = session && session.user.name.charAt(0).toUpperCase();

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    setIsCommenting(true);

    try {
      const results = await createComment(comment, postId);
      if (results?.success) {
        setComment("");
        toast.success("Comment added successfully!");
        router.push(`/blog/${postId}`, { scroll: false });
      }
    } catch (error) {
      console.error("Failed to create comment");
      toast.error("Failed to add comment");
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <div
      className="flex gap-3 items-start pt-8 w-full border-b-2 pb-6 border-neutral-300 dark:border-neutral-600"
      id="comment"
    >
      <div>
        <Avatar>
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
            onClick={handleSubmit}
            disabled={!comment.trim() || isCommenting}
            className={`px-4 py-1 text-sm rounded-lg font-semibold bg-black dark:bg-white ${
              !comment.trim() && "opacity-50"
            } text-white dark:text-black cursor-pointer`}
          >
            {isCommenting ? <Loader2Icon className="animate-spin" /> : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentField;
