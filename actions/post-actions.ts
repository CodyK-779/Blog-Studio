"use server";

import { auth } from "@/lib/auth";
import { Categories, Prisma } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createPost(content: string, title: string, subTitle?: string, selectedValue?: Categories) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const userId = session?.user.id;

  if (!userId) return; 

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        subTitle,
        categories: selectedValue,
        authorId: userId
      }
    })

    revalidatePath('/')
    return { success: true, post }
  } catch (error) {
    console.error(error)
  }
}

export async function getPost(selectedFilter: "asc" | "desc", selectedCategory?: Categories) {
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
            image: true
          }
        },
      },
    })

    return post;
  } catch (error) {
    console.error("Failed to fetch posts", error);
    throw new Error("Failed to fetch posts")
  }
}