"use client";

import Image from "next/image";
import { useState } from "react";

export default function CoveredImage({
  src,
  alt,
  flip,
  sizes,
}: {
  src: string;
  alt: string;
  flip?: boolean;
  sizes?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className={`object-cover transition duration-700 ease-out ${flip ? "-scale-x-100" : ""} ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-[#0000FF] transition-opacity duration-700 ease-out ${
          loaded ? "opacity-0" : "opacity-80"
        }`}
      />
    </>
  );
}
