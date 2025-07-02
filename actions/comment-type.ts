import { UserRole } from "@/lib/generated/prisma/client";

export type CommentAuthor = {
  name: string;
  id: string;
  image: string | null;
  role: UserRole;
};

export type CommentLike = {
  postId: string | null;
  userId: string;
  commentId: string | null;
};

export type BaseComment = {
  id: string;
  content: string;
  authorId: string;
  createdAt: Date;
  postId: string;
  parentId: string | null;
};

export type CommentWithRelations = BaseComment & {
  author: CommentAuthor;
  _count: {
    replies: number;
    likes: number;
  };
  replies: Array<BaseComment & {
    author: CommentAuthor;
    _count: {
      replies: number;
      likes: number;
    };
    likes: CommentLike[];
    updatedAt: Date;
  }>;
  likes: CommentLike[];
};

export type CommentsWithRelations = CommentWithRelations[];

export type ReplyWithRelations = BaseComment & {
  author: CommentAuthor;
  _count: {
    replies: number;
    likes: number;
  };
  likes: CommentLike[];
  updatedAt: Date;
};

export type RepliesWithRelations = ReplyWithRelations[];

export interface CommentWithExtras {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;

  author: {
    id: string;
    name: string;
    image: string | null;
    role: "User" | "Admin";
  };

  likes: {
    userId: string;
    postId: string | null;
    commentId: string | null;
  }[];

  _count: {
    replies: number;
    likes: number;
  };

  replies: CommentWithExtras[];
}
