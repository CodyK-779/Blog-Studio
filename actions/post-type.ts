import { $Enums, Categories, UserRole } from "@/lib/generated/prisma/client";

export type UserDetail = {
  name: string;
    id: string;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    role: $Enums.UserRole;
} | null

export type PostLike = {
  postId: string | null;
  userId: string;
};

export type PostCommentAuthor = {
  name: string;
  id: string;
  role: UserRole;
};

export type PostComment = {
  author: PostCommentAuthor;
};

export type PostAuthor = {
  name: string;
  id: string;
  image: string | null;
  role: UserRole;
};

export type BasePost = {
  id: string;
  title: string;
  subTitle: string | null;
  content: string;
  image: string;
  categories: Categories | null;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostWithRelations = BasePost & {
  comment: PostComment[];
  like: PostLike[];
  author: PostAuthor;
  _count: {
    comment: number;
    like: number;
  };
};

export type CurrentUser = {
  name: string;
  id: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  role: UserRole;
} | null;

export type PostWithUserContext = {
  post: PostWithRelations;
  currentUser: CurrentUser;
};

/*
// post:

{
  comment: {
    author: {
      name: string;
      id: string;
      role: $Enums.UserRole;
    };
  }[];
  like: {
    postId: string | null;
    userId: string;
  }[];
  author: {
    name: string;
    id: string;
    image: string | null;
    role: $Enums.UserRole;
  };
  _count: {
    comment: number;
    like: number;
  };
} & {
  id: string;
  title: string;
  subTitle: string | null;
  content: string;
  image: string;
  categories: $Enums.Categories | null;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

// currentUser: 

{
  name: string;
  id: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  role: $Enums.UserRole;
} | null;
*/