"use client";

import { Loader2Icon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { deletePost } from "@/actions/post-actions";
import { toast } from "sonner";
import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  postId: string;
}

const DeleteBlogBtn = ({ postId }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (postId: string) => {
    setIsDeleting(true);

    try {
      const results = await deletePost(postId);

      if (results.success) {
        toast.success("Blog post deleted successfully!");
        router.push("/blog");
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
    <Button
      variant="destructive"
      className="bg-red-500"
      size="sm"
      disabled={isDeleting}
      onClick={() => handleDelete(postId)}
    >
      {isDeleting ? <Loader2Icon className="animate-spin" /> : <TrashIcon />}
    </Button>
  );
};

export default DeleteBlogBtn;
