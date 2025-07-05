"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  postImage: string;
  postTitle: string;
}

const PostDetailImage = ({ postImage, postTitle }: Props) => {
  const [aspectRatio, setAspectRatio] = useState("aspect-video");

  useEffect(() => {
    const img = new window.Image();
    img.src = postImage;

    img.onload = () => {
      const { width, height } = img;

      // Dynamically set aspect ratio class
      if (height > width) {
        setAspectRatio("aspect-[3/4]"); // portrait
      } else if (width > height) {
        setAspectRatio("aspect-video"); // landscape
      } else {
        setAspectRatio("aspect-square"); // square
      }
    };

    img.onerror = () => {
      console.error("Failed to load image:", postImage);
    };
  }, [postImage]);

  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-xl overflow-hidden border-4`}
    >
      <Image
        src={postImage}
        alt={postTitle}
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 1024px"
        className="object-cover"
      />
    </div>
  );
};

export default PostDetailImage;
