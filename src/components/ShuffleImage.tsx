"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ShuffleImage({
  cover,
  images,
  alt,
}: {
  cover: string;
  images: string[];
  alt: string;
}) {
  const [hovering, setHovering] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!hovering) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 1500);
    return () => clearInterval(id);
  }, [hovering, images.length]);

  const src = hovering ? images[index] : cover;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 640px) 50vw, 100vw"
      className="object-contain"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setIndex(0);
      }}
    />
  );
}
