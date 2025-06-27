import { getAllUsers, getUser } from "@/actions/user-actions";
import { fallbackAvatar, formattedDate } from "@/components/BlogSection";
import DeleteUserBtn from "@/components/DeleteUserBtn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function UsersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return;

  const users = await getAllUsers();
  const specificUser = await getUser(session.user.id);

  return (
    <div className="px-4">
      <h1 className="text-center text-4xl sm:text-5xl mt-10 font-bold">
        <span className="text-red-500 dark:text-blue-600">Next-Blog</span> Users
      </h1>
      <p className="text-center text-xl sm:text-2xl mt-4 font-semibold">
        These are all the users who joined{" "}
        <span className="text-blue-600 dark:text-red-500">Next-Blog</span>
      </p>
      <div className="flex flex-col gap-5 mt-20 max-w-4xl w-full mx-auto">
        {users.map((user) => (
          <Card
            key={user.id}
            className="border-neutral-300 border-2 dark:border-neutral-500"
          >
            <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 py-6 px-3.5">
              <div className="flex items-center gap-2.5">
                <Avatar className="size-12 cursor-pointer">
                  <AvatarImage src={user.image!} />
                  <AvatarFallback className="bg-red-500 dark:bg-blue-600 text-white">
                    {fallbackAvatar(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <p>{user.name}</p>
                    {user.role === "Admin" && (
                      <i className="ri-vip-crown-fill text-yellow-400 ml-2"></i>
                    )}
                    <p className="ml-2 text-xs text-neutral-500 dark:text-neutral-400 max-[450px]:hidden">
                      <span className="mr-2">•</span> joined in{" "}
                      {formattedDate(user.createdAt)}
                    </p>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {user.email}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 hidden max-[450px]:block">
                    Joined in {formattedDate(user.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <Button asChild size="sm">
                  <Link href={`/profile/${user.id}`} className="font-semibold">
                    Visit Profile
                  </Link>
                </Button>
                {specificUser?.role === "Admin" && user.role !== "Admin" && (
                  <DeleteUserBtn userId={user.id} />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// •
