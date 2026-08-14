"use client";

import { useEffect, useRef, useState } from "react";

const END_DELAY_PX = 400;

export default function VideoScrollSlider({ videos }: { videos: { src: string; aspect: number }[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [wrapperHeight, setWrapperHeight] = useState(0);

  useEffect(() => {
    function measure() {
      if (!trackRef.current || !wrapperRef.current) return;
      const distance = Math.max(trackRef.current.scrollWidth - wrapperRef.current.clientWidth, 0);
      setMaxTranslate(distance);
      setWrapperHeight(window.innerHeight + distance + (distance > 0 ? END_DELAY_PX : 0));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    function onScroll() {
      if (!wrapperRef.current || !trackRef.current || maxTranslate <= 0) return;
      const scrolled = -wrapperRef.current.getBoundingClientRect().top;
      const progress = Math.min(Math.max(scrolled / maxTranslate, 0), 1);
      trackRef.current.style.transform = `translateX(-${progress * maxTranslate}px)`;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [maxTranslate, wrapperHeight]);

  return (
    <div ref={wrapperRef} style={{ height: wrapperHeight || "100vh" }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div ref={trackRef} className="flex gap-2.5 will-change-transform sm:gap-5">
          {videos.map((video) => (
            <video
              key={video.src}
              src={video.src}
              autoPlay
              muted
              loop
              playsInline
              className="h-[60vh] w-auto shrink-0 object-cover sm:h-[85vh]"
              style={{ aspectRatio: video.aspect }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
