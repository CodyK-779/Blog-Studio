"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  postImage: string;
  postTitle: string;
}

const PostDetailImage = ({ postImage, postTitle }: Props) => {
  const [imageClass, setImageClass] = useState("aspect-video object-cover");

  useEffect(() => {
    const img = new window.Image();
    img.src = postImage;

    img.onload = () => {
      const { width, height } = img;

      if (height > width) {
        setImageClass("aspect-[3/4] object-cover");
      } else if (width > height) {
        setImageClass("aspect-video object-cover");
      } else {
        setImageClass("aspect-square object-contain");
      }
    };
  }, [postImage]);

  return (
    <div
      className={`relative w-full ${imageClass} rounded-xl overflow-hidden border-4 bg-black`}
    >
      <Image
        src={postImage}
        alt={postTitle}
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 1024px"
      />
    </div>
  );
};

export default PostDetailImage;
