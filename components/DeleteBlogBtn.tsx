"use client";

import { Loader2Icon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { deletePost } from "@/actions/post-actions";
import { toast } from "sonner";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useEdgeStore } from "@/lib/edgestore";

interface Props {
  postId: string;
  imageUrl: string;
  redirectPath: string;
}

const DeleteBlogBtn = ({ postId, imageUrl, redirectPath }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { edgestore } = useEdgeStore();
  const router = useRouter();

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    postId: string
  ) => {
    setIsDeleting(true);

    try {
      if (imageUrl) {
        await edgestore.publicFiles.delete({
          url: imageUrl,
        });
      }
      const results = await deletePost(postId);

      if (results.success) {
        toast.success("Blog post deleted successfully!");
        router.push(redirectPath);
      } else {
        toast.error("Failed to delete Blog post.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="bg-red-500"
          size="sm"
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <Trash2Icon />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this post?. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-black hover:bg-neutral-800 hover:text-white text-white dark:bg-white dark:hover:bg-opacity-90 dark:text-black">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => handleDelete(e, postId)}
            className="bg-red-500 hover:bg-red-700 text-white"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBlogBtn;
