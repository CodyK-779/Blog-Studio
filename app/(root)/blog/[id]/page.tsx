import { getPostDetails } from "@/actions/post-actions";

export default async function BlogPageDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const postId = (await params).id;

  const posts = await getPostDetails(postId);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
          {post.subTitle && <p>{post.subTitle}</p>}
          <p>{post.content}</p>
          <p>{post.author.name}</p>
        </div>
      ))}
    </div>
  );
}
