"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  postImage: string;
  postTitle: string;
}

const PostDetailImage = ({ postImage, postTitle }: Props) => {
  const [isTallImage, setIsTallImage] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = postImage;

    img.onload = () => {
      setIsTallImage(img.height > img.width);
    };

    img.onerror = () => {
      console.error("Failed to load image:", postImage);
    };
  }, [postImage]);

  return (
    <div
      className={`relative w-full aspect-video rounded-xl overflow-hidden border-4 ${
        isTallImage ? "aspect-[3/4]" : "aspect-video"
      }`}
    >
      <Image
        src={postImage}
        alt={postTitle}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 1024px"
        className={isTallImage ? "object-contain" : "object-cover"}
      />
    </div>
  );
};

export default PostDetailImage;
