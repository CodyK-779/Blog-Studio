"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const runtime = "nodejs";

export async function createComment(comment: string, postId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) return;

    await prisma.comment.create({
      data: {
        authorId: session.user.id,
        postId,
        content: comment
      }
    })

    return { success: true };
  } catch (error) {
    console.error("Failed to create comment", error);
    throw new Error("Failed to create comment")
  }
}

export async function deleteComment(commentId: string) {
  try {
    if (!commentId) return;

    await prisma.comment.delete({
      where: {
        id: commentId
      }
    });

    return { success: true }
  } catch (error) {
    console.error("Failed to delete comment");
    throw new Error("Failed to delete comment");
  }
}

export async function toggleCmtLike(commentId: string, postId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) return;

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_commentId: {
          userId: session.user.id,
          commentId
        }
      }
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_commentId: {
            userId: session.user.id,
            commentId
          }
        }
      })
    } else {
      await prisma.like.create({
        data: {
          userId: session.user.id,
          commentId
        }
      })
    }

    revalidatePath(`/blog/${postId}`);
    return { success: true }
  } catch (error) {
    console.error("Failed to like comment:", error);
    return { success: false, error: "Failed to like comment" };
  }
}

export async function createReply(postId: string, content: string, commentId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) return;

    await prisma.comment.create({
      data: {
        authorId: session.user.id,
        postId,
        parentId: commentId,
        content
      }
    })

    return { success: true }
  } catch (error) {
    console.error("Failed to create reply", error);
    throw new Error("Failed to creaet reply")
  }
}