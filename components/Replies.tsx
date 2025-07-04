"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { RepliesWithRelations } from "@/actions/comment-type";
import { creator, fallbackAvatar, getShortTimeAgo } from "./CommentSection";
import LikeCmtDelete from "./LikeCmtDelete";
import { UserDetail } from "@/actions/post-type";
import { useState } from "react";
import Link from "next/link";

interface Props {
  user: UserDetail;
  postId: string;
  authorId: string;
  replyCount: number;
  replies: RepliesWithRelations;
}

const Replies = ({ user, authorId, postId, replies, replyCount }: Props) => {
  const [openView, setOpenView] = useState(false);

  return (
    <div>
      {!openView && (
        <p
          className="text-xs font-medium text-neutral-500 dark:text-neutral-400 cursor-pointer"
          onClick={() => setOpenView(true)}
        >
          --View {replyCount} replies--
        </p>
      )}
      {openView &&
        replies.map((r) => (
          <div key={r.id} className="flex gap-3 mt-2 mb-4">
            <Link href={`/profile/${r.author.id}`}>
              <Avatar className="size-8">
                <AvatarImage src={r.author.image!} />
                <AvatarFallback className="bg-red-500 dark:bg-blue-600 text-white">
                  {fallbackAvatar(r.author.name)}
                </AvatarFallback>
              </Avatar>
            </Link>

            <div className="flex flex-col flex-1">
              <div className="flex items-center">
                <p className="max-[375px]:text-xs text-sm font-semibold">
                  {r.author.name}
                </p>
                {r.author.role === "Admin" && (
                  <i
                    className={`ri-vip-crown-fill ml-2 ${
                      r.author.id === creator
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }`}
                  ></i>
                )}
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-300">
                  <span className="mx-2">•</span>
                  {getShortTimeAgo(r.createdAt)}
                </p>
                {r.author.id === authorId && (
                  <p className="text-xs font-medium text-neutral-500 dark:text-neutral-300">
                    <span className="mx-2">•</span>Authur
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between items-start">
                <div className="flex flex-col flex-1">
                  <p className="text-sm my-1">{r.content}</p>
                </div>
                <LikeCmtDelete
                  user={user}
                  comment={r}
                  postId={postId}
                  authorId={authorId}
                  small={true}
                />
              </div>
            </div>
          </div>
        ))}
      {openView && (
        <p
          className="text-xs font-medium text-neutral-500 dark:text-neutral-400 cursor-pointer"
          onClick={() => setOpenView(false)}
        >
          Hide replies
        </p>
      )}
    </div>
  );
};

export default Replies;
