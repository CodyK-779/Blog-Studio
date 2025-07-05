"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  postImage: string;
  postTitle: string;
}

const PostDetailImage = ({ postImage, postTitle }: Props) => {
  const [aspectRatio, setAspectRatio] = useState("aspect-video");
  const [objectStyle, setObjectStyle] = useState("object-cover");

  useEffect(() => {
    const img = new window.Image();
    img.src = postImage;

    img.onload = () => {
      const { width, height } = img;
      const ratio = width / height;

      // Wide
      if (ratio > 1.3) {
        setAspectRatio("aspect-video");
        setObjectStyle("object-cover");
      }
      // Portrait
      else if (ratio < 0.8) {
        setAspectRatio("aspect-[3/4]");
        setObjectStyle("object-cover");
      }
      // Nearly square
      else {
        setAspectRatio("aspect-[4/5]");
        setObjectStyle("object-contain");
      }
    };
  }, [postImage]);

  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-xl overflow-hidden border-4 bg-black`}
    >
      <Image
        src={postImage}
        alt={postTitle}
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 768px, 1024px"
        className={objectStyle}
      />
    </div>
  );
};

export default PostDetailImage;
