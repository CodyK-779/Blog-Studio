import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, {params}: {params: Promise<{commentId: string}>}) {
  const commentId = (await params).commentId;

  const replies = await prisma.comment.findMany({
    where: {
      parentId: commentId
    },
  })
}