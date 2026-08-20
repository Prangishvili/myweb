import Image from "next/image";
import type { CaseStudyImage } from "@/data/silk";
import ProjectSlider from "@/components/ProjectSlider";
import BlurImageGrid from "@/components/BlurImageGrid";
import SmoothScroll from "@/components/SmoothScroll";
import CoveredImage from "@/components/CoveredImage";

function Frame({ image }: { image: CaseStudyImage }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: image.aspect }}>
      <CoveredImage src={image.src} alt="" flip={image.flip} />
    </div>
  );
}

function AppStoreCard({
  appStore,
  className = "",
  invert = false,
  compact = false,
}: {
  appStore: { name: string; about: string; shortAbout?: string; icon: string; url: string };
  className?: string;
  invert?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={`mx-auto ${compact ? "max-w-[680px]" : "max-w-[1050px]"} px-3 sm:px-10 ${className}`}>
      <a
        href={appStore.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center rounded-2xl transition-colors ${
          compact ? "gap-4 p-5" : "gap-4 p-5 sm:gap-5 sm:p-8"
        } ${invert ? "bg-black/5 hover:bg-black/8" : "bg-white/10 hover:bg-white/15"}`}
      >
        <Image
          src={appStore.icon}
          alt=""
          width={compact ? 64 : 80}
          height={compact ? 64 : 80}
          className={`shrink-0 rounded-[22%] ${compact ? "size-14" : "size-14 sm:size-20"}`}
        />
        <span className="min-w-0 flex-1">
          <span className={`block font-semibold ${compact ? "text-lg" : "text-lg sm:text-2xl"}`}>
            {appStore.name}
          </span>
          <span className={`block ${compact ? "text-base" : "text-sm sm:text-base"} ${invert ? "text-black/50" : "text-white/50"}`}>
            {compact ? (
              <span className="block truncate">{appStore.about}</span>
            ) : (
              <>
                <span className="block truncate sm:hidden">{appStore.shortAbout ?? appStore.about}</span>
                <span className="hidden sm:block">{appStore.about}</span>
              </>
            )}
          </span>
        </span>
        <span
          className={`shrink-0 rounded-full font-semibold ${compact ? "px-5 py-2.5 text-base" : "px-4 py-2 text-sm sm:px-6 sm:py-2.5 sm:text-base"} ${
            invert ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          Open
        </span>
      </a>
    </div>
  );
}

export default function CaseStudy({
  description,
  appStore,
  credits,
  hero,
  images,
  projectTitle,
}: {
  description: string;
  appStore?: { name: string; about: string; shortAbout?: string; icon: string; url: string };
  credits?: { label: string; value: string }[];
  hero: CaseStudyImage;
  images: CaseStudyImage[];
  projectTitle?: string;
}) {
  const rows: CaseStudyImage[][] = [];
  for (let i = 0; i < images.length; i++) {
    if (images[i].half && images[i + 1]?.half) {
      rows.push([images[i], images[i + 1]]);
      i++;
    } else {
      rows.push([images[i]]);
    }
  }

  return (
    <>
      <SmoothScroll />
      <div className="px-2 pt-20">
        <Frame image={hero} />
      </div>
      {appStore && <AppStoreCard appStore={appStore} className="mt-10 mb-6 sm:mt-20 sm:mb-10" />}
      <div
        className={`mx-auto max-w-[1050px] px-3 pb-10 sm:px-10 sm:pb-20 ${appStore ? "" : "pt-10 sm:pt-20"}`}
      >
        {description.split("\n\n").map((paragraph, i) => (
          <p key={i} className="text-lg leading-[1.7] last:mb-0 mb-6 sm:mb-8 sm:text-2xl sm:leading-[1.65]">
            {paragraph}
          </p>
        ))}
      </div>
      <BlurImageGrid
        rows={rows}
        className={`flex flex-col gap-2.5 px-2 sm:gap-5 ${credits ? "pb-2 sm:pb-4" : "pb-10 sm:pb-20"}`}
      />
      <div className="bg-white text-black">
        <div id="header-invert-start" />
        {credits && (
          <div className="mx-auto flex max-w-[1050px] flex-col items-center gap-6 px-3 pt-20 pb-6 text-center sm:gap-8 sm:px-10 sm:pt-32 sm:pb-10">
            {credits.map((credit) => (
              <div key={credit.label}>
                <p className="text-base font-semibold text-black/40 sm:text-xl">{credit.label}</p>
                <p className="text-xl font-semibold sm:text-3xl">{credit.value}</p>
              </div>
            ))}
          </div>
        )}
        {appStore && <AppStoreCard appStore={appStore} invert compact className="pb-6 sm:pb-10" />}
        {projectTitle && <ProjectSlider currentProjectTitle={projectTitle} />}
      </div>
    </>
  );
}
