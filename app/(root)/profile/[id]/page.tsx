import { getUser } from "@/actions/user-actions";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;

  const user = await getUser(userId);

  return <div>welcome {user?.name}</div>;
}
