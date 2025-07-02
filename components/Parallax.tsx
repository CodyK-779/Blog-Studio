import { getAllPosts } from "@/actions/post-actions";
import { HeroParallax } from "./ui/hero-parallax";

const Parallax = async () => {
  const posts = await getAllPosts();

  const products = posts.map((post) => ({
    title: post.title,
    link: `/blog/${post.id}`,
    thumbnail: post.image,
  }));

  return <HeroParallax products={products} />;
};

export default Parallax;
