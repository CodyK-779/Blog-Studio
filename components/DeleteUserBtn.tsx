"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { deleteUser } from "@/actions/user-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2Icon, Trash2Icon } from "lucide-react";
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
import { authClient } from "@/lib/auth-client";

interface Props {
  userId: string;
  text?: boolean;
  redirectPath: string;
}

const DeleteUserBtn = ({ userId, text, redirectPath }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (userId: string) => {
    setIsDeleting(true);

    try {
      const results = await deleteUser(userId);

      if (results.success) {
        toast.success("User deleted successfully!");
        if (redirectPath === "/blog") {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push(redirectPath);
              },
            },
          });
        } else {
          router.push("/users");
        }
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="destructive"
          className="bg-red-500 hover:bg-red-600"
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2Icon className="animate-spin" />
          ) : text ? (
            "Delete account"
          ) : (
            <Trash2Icon />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this account? This action cannot be
            undone. This account will be permanently deleted from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-black hover:bg-neutral-800 hover:text-white text-white dark:bg-white dark:hover:bg-opacity-90 dark:text-black">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(userId)}
            className="bg-red-500 hover:bg-red-700 text-white"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserBtn;
