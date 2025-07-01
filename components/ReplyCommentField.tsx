"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession } from "@/lib/auth-client";
import { Textarea } from "./ui/textarea";
import { Loader2Icon } from "lucide-react";

const ReplyCommentField = () => {
  const [openCmt, setOpenCmt] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState("");

  const { data: session } = useSession();

  if (!session) return null;

  const fallbackAvatar = session && session.user.name.charAt(0).toUpperCase();

  return (
    <>
      {!openCmt && (
        <p
          className="text-xs font-medium text-neutral-500 dark:text-neutral-400 cursor-pointer"
          onClick={() => setOpenCmt(true)}
        >
          Reply
        </p>
      )}
      {openCmt && (
        <div className="flex gap-3 items-start pt-8 w-full pb-4">
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
                onClick={() => setOpenCmt(false)}
              >
                Cancel
              </button>
              <button
                // onClick={handleSubmit}
                disabled={isCommenting}
                className="px-3 py-1 text-xs rounded-lg font-semibold bg-black dark:bg-white text-white dark:text-black"
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
