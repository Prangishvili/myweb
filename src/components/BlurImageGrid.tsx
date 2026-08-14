"use client";

import type { CaseStudyImage } from "@/data/silk";
import VideoScrollSlider from "@/components/VideoScrollSlider";
import CoveredImage from "@/components/CoveredImage";

function BlurFrame({ image }: { image: CaseStudyImage }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: image.aspect }}>
      <CoveredImage src={image.src} alt="" flip={image.flip} />
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
