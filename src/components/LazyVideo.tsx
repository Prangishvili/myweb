"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function LazyVideo({
  poster,
  src,
  alt,
  className,
}: {
  poster: string;
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 size-full">
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        className={`${className} transition-opacity duration-300 ${videoReady ? "opacity-0" : "opacity-100"}`}
      />
      {shouldLoad && (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          className={`${className} absolute inset-0 transition-opacity duration-300 ${videoReady ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
