"use client";

import Image from "next/image";
import { useState } from "react";

export default function CoveredImage({
  src,
  alt,
  flip,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  flip?: boolean;
  sizes?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        priority={priority}
        className={`object-cover transition-opacity duration-500 ease-out ${flip ? "-scale-x-100" : ""} ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-[#0000FF] transition-opacity duration-500 ease-out ${
          loaded ? "opacity-0" : "opacity-90"
        }`}
      />
    </>
  );
}
