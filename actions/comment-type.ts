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

/*
{
    id: string;
    content: string;
    authorId: string;
    createdAt: Date;
    postId: string;
    parentId: string | null;
    author: {
      name: string;
      id: string;
      image: string | null;
      role: $Enums.UserRole;
    };
    _count: {
      replies: number;
      likes: number;
    };
    replies: {
      id: string;
      content: string;
      authorId: string;
      createdAt: Date;
      updatedAt: Date;
      postId: string;
      parentId: string | null;
      author: {
        name: string;
        id: string;
        image: string | null;
        role: $Enums.UserRole;
      };
      _count: {
        replies: number;
        likes: number;
      };
      likes: {
        postId: string | null;
        userId: string;
        commentId: string | null;
      }[];
    }[];
    likes: {}[];
  }[];
*/