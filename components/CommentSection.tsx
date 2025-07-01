"use client";

import { useSession } from "@/lib/auth-client";
import LikeCmtDelete from "./LikeCmtDelete";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ReplyCommentField from "./ReplyCommentField";
import { formatDistanceToNowStrict } from "date-fns";
import { CommentsWithRelations } from "@/actions/comment-type";
import { UserDetail } from "@/actions/post-type";

interface Props {
  user: UserDetail;
  authorId: string;
  postId: string;
  comments: CommentsWithRelations;
}

const CommentSection = ({ user, authorId, postId, comments }: Props) => {
  const { data: session } = useSession();

  if (!session) return null;

  const fallbackAvatar = (authorName: string) => {
    return authorName.charAt(0).toUpperCase();
  };

  function getShortTimeAgo(date: Date) {
    const full = formatDistanceToNowStrict(date, {
      addSuffix: false,
      roundingMethod: "floor",
    });

    // e.g., "4 hours", "3 days", "1 year"
    const [amount, unit] = full.split(" ");
    const shortUnit = unit[0]; // h, d, y, etc.
    return `${amount}${shortUnit}`;
  }

  return (
    <div className="w-full">
      <h1 className="text-center text-3xl font-bold pt-6 mb-16">Comments</h1>
      {comments.length > 0 ? (
        comments.map((cmt) => (
          <div key={cmt.id} className="flex gap-3 mb-8">
            <Avatar>
              <AvatarImage src={cmt.author.image!} />
              <AvatarFallback className="bg-red-500 dark:bg-blue-600 text-white">
                {fallbackAvatar(cmt.author.name)}
              </AvatarFallback>
            </Avatar>
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
                <div className="flex flex-col">
                  <p className="text-sm my-1">{cmt.content}</p>
                  <ReplyCommentField />
                </div>
                <LikeCmtDelete
                  user={user}
                  comment={cmt}
                  postId={postId}
                  authorId={authorId}
                />
              </div>
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
