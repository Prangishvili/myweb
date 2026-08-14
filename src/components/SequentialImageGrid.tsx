"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CaseStudyImage } from "@/data/silk";
import VideoScrollSlider from "@/components/VideoScrollSlider";
import { blurPlaceholders } from "@/data/blurPlaceholders";

function SequentialFrame({
  image,
  index,
  unlockedIndex,
  onLoaded,
}: {
  image: CaseStudyImage;
  index: number;
  unlockedIndex: number;
  onLoaded: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const canLoad = nearViewport && index <= unlockedIndex;
  const blurDataURL = blurPlaceholders[image.src];

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden bg-cover bg-center"
      style={{ aspectRatio: image.aspect, backgroundImage: blurDataURL ? `url(${blurDataURL})` : undefined }}
    >
      {canLoad && (
        <Image
          src={image.src}
          alt=""
          fill
          sizes="100vw"
          placeholder={blurDataURL ? "blur" : undefined}
          blurDataURL={blurDataURL}
          className={`object-cover ${image.flip ? "-scale-x-100" : ""}`}
          onLoad={() => onLoaded(index)}
          onError={() => onLoaded(index)}
        />
      )}
    </div>
  );
}

export default function SequentialImageGrid({ rows, className }: { rows: CaseStudyImage[][]; className: string }) {
  const [unlockedIndex, setUnlockedIndex] = useState(0);

  const onLoaded = useCallback((index: number) => {
    setUnlockedIndex((prev) => Math.max(prev, index + 1));
  }, []);

  let cursor = 0;

  return (
    <div className={className}>
      {rows.map((row) => {
        if (row[0].videos) {
          return (
            <div key={row[0].src}>
              <VideoScrollSlider videos={row[0].videos} />
            </div>
          );
        }
        if (row.length === 2) {
          const leftIndex = cursor++;
          const rightIndex = cursor++;
          return (
            <div key={row[0].src} className="flex flex-col gap-2.5 sm:flex-row sm:gap-5">
              <div className="w-full">
                <SequentialFrame image={row[0]} index={leftIndex} unlockedIndex={unlockedIndex} onLoaded={onLoaded} />
              </div>
              <div className="w-full">
                <SequentialFrame
                  image={row[1]}
                  index={rightIndex}
                  unlockedIndex={unlockedIndex}
                  onLoaded={onLoaded}
                />
              </div>
            </div>
          );
        }
        const idx = cursor++;
        return (
          <div key={row[0].src}>
            <SequentialFrame image={row[0]} index={idx} unlockedIndex={unlockedIndex} onLoaded={onLoaded} />
          </div>
        );
      })}
    </div>
  );
}
