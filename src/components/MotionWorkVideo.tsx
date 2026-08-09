"use client";

import { useRef, useState, useEffect } from "react";

export default function MotionWorkVideo({
  src,
  index,
  autoOpen = false,
}: {
  src: string;
  index: number;
  autoOpen?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (autoOpen) {
      setIsFullscreen(true);
    }
  }, [autoOpen]);

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

  const handleShareLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/work/motion-works?video=${index}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Motion Works",
          text: "Check out this motion work",
          url: url,
        });
      } catch (err) {
        console.error("Failed to share:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy link:", err);
      }
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
          <button
            onClick={handleShareLink}
            className="absolute top-6 right-6 text-white px-4 py-2 rounded text-sm font-semibold hover:opacity-60 z-50"
          >
            {copied ? "Copied!" : "Share"}
          </button>
          <video
            ref={fullscreenVideoRef}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  );
}
