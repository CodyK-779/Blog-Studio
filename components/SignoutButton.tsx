"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
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

const SignoutButton = () => {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    setIsPending(true);

    try {
      await signOut();
      window.location.href = "/login";
      toast.success("User Signed out successfully!");
    } catch (error) {
      toast.error("Sign out failed");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="font-medium bg-red-500 hover:bg-red-600 flex items-center text-white w-fit gap-2"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2Icon className="animate-spin" />
              Loading...
            </>
          ) : (
            <>Sign Out</>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Signout Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to signout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-black hover:bg-neutral-800 hover:text-white text-white dark:bg-white dark:hover:bg-opacity-90 dark:text-black">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleClick}
            className="bg-red-500 hover:bg-red-700 text-white"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignoutButton;
