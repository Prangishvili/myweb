"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

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

  useEffect(() => {
    if (!isFullscreen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseFullscreen();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isFullscreen]);

  const handleShareLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/work/motion-works?video=${index}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
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

      {isFullscreen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={handleCloseFullscreen}
          >
            <button
              onClick={handleShareLink}
              className="absolute top-6 right-6 z-50 rounded px-4 py-2 text-sm font-semibold text-white hover:opacity-60"
            >
              {copied ? "Copied" : "Share"}
            </button>
            <video
              ref={fullscreenVideoRef}
              src={src}
              autoPlay
              muted
              loop
              playsInline
              className="max-h-full max-w-full object-contain"
            />
          </div>,
          document.body,
        )}
    </>
  );
}
