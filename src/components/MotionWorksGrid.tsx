"use client";

import { useSearchParams } from "next/navigation";
import MotionWorkVideo from "@/components/MotionWorkVideo";
import Reveal from "@/components/Reveal";

export default function MotionWorksGrid({ showreel }: { showreel: string[] }) {
  const searchParams = useSearchParams();
  const videoIndex = searchParams.get("video");

  return (
    <div className="grid grid-cols-3 gap-2 px-2 pt-20 pb-2 sm:gap-2.5 sm:px-2.5 sm:pb-2.5">
      {showreel.map((src, index) => (
        <Reveal key={src} delay={(index % 3) * 80}>
          <MotionWorkVideo src={src} index={index} autoOpen={videoIndex === String(index)} />
        </Reveal>
      ))}
    </div>
  );
}
