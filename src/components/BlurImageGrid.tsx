"use client";

import Image from "next/image";
import type { CaseStudyImage } from "@/data/silk";
import VideoScrollSlider from "@/components/VideoScrollSlider";
import { blurPlaceholders } from "@/data/blurPlaceholders";

function BlurFrame({ image }: { image: CaseStudyImage }) {
  const blurDataURL = blurPlaceholders[image.src];

  return (
    <div
      className="relative w-full overflow-hidden bg-cover bg-center"
      style={{ aspectRatio: image.aspect, backgroundImage: blurDataURL ? `url(${blurDataURL})` : undefined }}
    >
      <Image
        src={image.src}
        alt=""
        fill
        sizes="100vw"
        placeholder={blurDataURL ? "blur" : undefined}
        blurDataURL={blurDataURL}
        className={`object-cover ${image.flip ? "-scale-x-100" : ""}`}
      />
    </div>
  );
}

export default function BlurImageGrid({ rows, className }: { rows: CaseStudyImage[][]; className: string }) {
  return (
    <div className={className}>
      {rows.map((row) => (
        <div key={row[0].src}>
          {row[0].videos ? (
            <VideoScrollSlider videos={row[0].videos} />
          ) : row.length === 2 ? (
            <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-5">
              {row.map((image) => (
                <div key={image.src} className="w-full">
                  <BlurFrame image={image} />
                </div>
              ))}
            </div>
          ) : (
            <BlurFrame image={row[0]} />
          )}
        </div>
      ))}
    </div>
  );
}
