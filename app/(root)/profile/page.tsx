import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Profile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <div>welcome {session?.user.name}</div>;
}
