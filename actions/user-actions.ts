"use server";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        role: "desc"
      },
    })

    return users;
  } catch (error) {
    console.error("Failed to fetch users", error);
    throw new Error("Failed to fetch users")
  }
}

export async function getUser(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        _count: {
          select: {
            post: true
          }
        }
      }
    })

    return user;
  } catch (error) {
    console.error("Failed to fetch user.", error)
    throw new Error("Failed to fetch user.")
  }
}

export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: {
        id: userId
      }
    })

    return { success: true }
  } catch (error) {
    console.error("Failed to delete user", error);
    throw new Error("Failed to delete user")
  }
}

export async function getUserId(userId: string) {
  if (!userId) return;

  const users = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  return users;
}