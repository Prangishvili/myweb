"use client";

import { useRef, useState } from "react";

export default function MotionWorkVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleClick = () => {
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCloseFullscreen();
    }
  };

  return (
    <>
      <div className="relative aspect-square overflow-hidden bg-black cursor-pointer" onClick={handleClick}>
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 size-full object-contain"
        />
      </div>

      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={handleCloseFullscreen}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <video
            ref={fullscreenVideoRef}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
