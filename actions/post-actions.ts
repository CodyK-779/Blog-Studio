"use server";

import { auth } from "@/lib/auth";
import { Categories, Prisma } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createPost(content: string, title: string, subTitle?: string, selectedValue?: Categories, uploadImage?: string) {
  try {
    const session = await auth.api.getSession({
    headers: await headers()
    });

    if (!session) return;

    const userId = session.user.id;

    if (!userId) return;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        subTitle,
        categories: selectedValue,
        authorId: userId,
        image: uploadImage!
      }
    })

    revalidatePath("/blog/library");
    return { success: true, post }
  } catch (error) {
    console.error(error)
  }
}

export async function getPost(selectedFilter: "asc" | "desc", selectedCategory?: Categories, take6?: boolean) {
  try {
    const whereClause: Prisma.PostWhereInput = {};
    
    if (selectedCategory) {
      whereClause.categories = selectedCategory
    }

    const post = await prisma.post.findMany({
      orderBy: {
        createdAt: selectedFilter
      },
      where: whereClause,
      include: {
        author: {
          select: {
            name: true,
            image: true,
            role: true,
            email: true
          }
        },
      },
      ...(take6 ? { take: 6 } : {})
    })

    return post;
  } catch (error) {
    console.error("Failed to fetch posts", error);
    throw new Error("Failed to fetch posts")
  }
}

export async function getPostDetails(id: string) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        id
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            role: true,
            email: true
          }
        },
        comment: {
          where: {
            parentId: null
          },
          orderBy: {
            createdAt: "asc"
          },
          select: {
            id: true,
            authorId: true,
            postId: true,
            content: true,
            createdAt: true,
            parentId: true,
            author: {
              select: {
                id: true,
                name: true,
                role: true,
                image: true
              }
            },
            likes: {
              select: {
                userId: true,
                postId: true,
                commentId: true
              }
            },
            _count: {
              select: {
                likes: true,
                replies: true
              }
            },
            replies: {
              include: {
                author: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                    role: true
                  }
                },
                likes: {
                  select: {
                    userId: true,
                    postId: true,
                    commentId: true
                  }
                },
                _count: {
                  select: {
                    likes: true,
                    replies: true
                  }
                }
              },
            }
          }
        },
        like: {
          select: {
            userId: true,
            postId: true
          }
        },
        _count: {
          select: {
            like: true,
            comment: true
          }
        }
      },
    })

    return posts;
  } catch (error) {
    console.error("Failed to fetch post details", error);
    throw new Error("Failed to fetch post details")
  }
}

export async function deletePost(postId: string) {
  try {
    await prisma.post.delete({
      where: {
        id: postId
      }
    })

    return { success: true }
  } catch (error) {
    console.error("Failed to delete post", error);
    throw new Error("Failed to delete post")
  }
}

export async function toggleLike(postId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) return;

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId
        }
      }
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId
          }
        }
      })
    } else {
      await prisma.like.create({
        data: {
          userId: session.user.id,
          postId
        }
      })
    }

    revalidatePath(`/blog/${postId}`);
    return { success: true }
  } catch (error) {
    console.error("Failed to toggle like:", error);
    return { success: false, error: "Failed to toggle like" };
  }
}

export async function getUserPost(userId: string) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId
      },
      include: {
        author: true
      }
    });

    return posts;
  } catch (error) {
    console.error("Failed to fetch posts", error);
    throw new Error("Failed to fetch posts")
  }
}

export async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany({
      take: 15
    });

    return posts;
  } catch (error) {
    console.error("Failed to fetch all posts", error);
    throw new Error("Failed to fetch all posts");
  }
}

export async function getPostId(postId: string) {
  if (!postId) return;

  const posts = await prisma.post.findUnique({
    where: {
      id: postId
    }
  });

  return posts;
}