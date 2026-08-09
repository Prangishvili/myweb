"use client";

import { useEffect, useRef, useState } from "react";
import { showreel } from "@/data/content";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});
  }, [index]);

  return (
    <section className="h-[70vh] w-full bg-white sm:h-[85vh]">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="size-full object-cover"
        onEnded={() => setIndex((i) => (i + 1) % showreel.length)}
      >
        <source src={showreel[index]} type="video/mp4" />
      </video>
    </section>
  );
}
