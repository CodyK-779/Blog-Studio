"use client";

import { useSession } from "@/lib/auth-client";
import LikeCmtDelete from "./LikeCmtDelete";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ReplyCommentField from "./ReplyCommentField";
import { formatDistanceToNowStrict } from "date-fns";
import { CommentsWithRelations } from "@/actions/comment-type";
import { UserDetail } from "@/actions/post-type";
import Replies from "./Replies";
import { useState } from "react";
import Link from "next/link";

interface Props {
  user: UserDetail;
  authorId: string;
  postId: string;
  comments: CommentsWithRelations;
}

export const fallbackAvatar = (authorName: string) => {
  return authorName.charAt(0).toUpperCase();
};

export function getShortTimeAgo(date: Date) {
  const full = formatDistanceToNowStrict(date, {
    addSuffix: false,
    roundingMethod: "floor",
  });

  // e.g., "4 hours", "3 days", "1 year"
  const [amount, unit] = full.split(" ");
  const shortUnit = unit[0]; // h, d, y, etc.
  return `${amount}${shortUnit}`;
}

const CommentSection = ({ user, authorId, postId, comments }: Props) => {
  const { data: session } = useSession();
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  if (!session) return null;

  return (
    <div className="w-full">
      <h1 className="text-center text-3xl font-bold pt-6 mb-16">Comments</h1>
      {comments.length > 0 ? (
        comments.map((cmt) => (
          <div key={cmt.id} className="flex gap-3 mb-8">
            <Link href={`/profile/${cmt.author.id}`}>
              <Avatar>
                <AvatarImage src={cmt.author.image!} />
                <AvatarFallback className="bg-red-500 dark:bg-blue-600 text-white">
                  {fallbackAvatar(cmt.author.name)}
                </AvatarFallback>
              </Avatar>
            </Link>

            <div className="flex flex-col flex-1">
              <div className="flex items-center">
                <p className="text-sm font-semibold">{cmt.author.name}</p>
                {cmt.author.role === "Admin" && (
                  <i className="ri-vip-crown-fill text-yellow-400 ml-2"></i>
                )}
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-300">
                  <span className="mx-2">•</span>
                  {getShortTimeAgo(cmt.createdAt)}
                </p>
                {cmt.author.id === authorId && (
                  <p className="text-xs font-medium text-neutral-500 dark:text-neutral-300">
                    <span className="mx-2">•</span>Authur
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between items-start">
                <div className="flex flex-col flex-1">
                  <p className="text-sm my-1">{cmt.content}</p>
                  <ReplyCommentField
                    postId={postId}
                    commentId={cmt.id}
                    activeReplyId={activeReplyId}
                    setActiveReplyId={setActiveReplyId}
                  />
                </div>
                <LikeCmtDelete
                  user={user}
                  comment={cmt}
                  postId={postId}
                  authorId={authorId}
                />
              </div>
              {cmt.replies.length > 0 && (
                <div className="mt-4">
                  <Replies
                    user={user}
                    authorId={authorId}
                    postId={postId}
                    replies={cmt.replies}
                    replyCount={cmt._count.replies}
                  />
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-4">
          No comments yet
        </p>
      )}
    </div>
  );
};

export default CommentSection;
