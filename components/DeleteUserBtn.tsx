"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { deleteUser } from "@/actions/user-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2Icon, Trash2Icon } from "lucide-react";

interface Props {
  userId: string;
}

const DeleteUserBtn = ({ userId }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (userId: string) => {
    setIsDeleting(true);

    try {
      const results = await deleteUser(userId);

      if (results.success) {
        toast.success("User deleted successfully!");
        router.push("/users");
      } else {
        toast.error("Failed to delete User.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="destructive"
      className="bg-red-500 hover:bg-red-600"
      onClick={() => handleDelete(userId)}
      disabled={isDeleting}
    >
      {isDeleting ? <Loader2Icon className="animate-spin" /> : <Trash2Icon />}
    </Button>
  );
};

export default DeleteUserBtn;
