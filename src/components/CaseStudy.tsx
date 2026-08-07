import Image from "next/image";
import type { CaseStudyImage } from "@/data/silk";

function Frame({ image }: { image: CaseStudyImage }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: image.aspect }}>
      <Image
        src={image.src}
        alt=""
        fill
        sizes="100vw"
        className={`object-cover ${image.flip ? "-scale-x-100" : ""}`}
      />
    </div>
  );
}

export default function CaseStudy({
  description,
  hero,
  images,
}: {
  description: string;
  hero: CaseStudyImage;
  images: CaseStudyImage[];
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
      <div className="px-4 pt-24 sm:px-5 sm:pt-28">
        <Frame image={hero} />
      </div>
      <p className="mx-auto max-w-[1300px] px-6 py-12 text-lg leading-[1.7] sm:px-10 sm:text-2xl sm:leading-[1.65]">
        {description}
      </p>
      <div className="flex flex-col gap-5 px-4 pb-20 sm:px-5">
        {rows.map((row) =>
          row.length === 2 ? (
            <div key={row[0].src} className="flex flex-col gap-5 sm:flex-row">
              {row.map((image) => (
                <div key={image.src} className="w-full">
                  <Frame image={image} />
                </div>
              ))}
            </div>
          ) : (
            <Frame key={row[0].src} image={row[0]} />
          ),
        )}
      </div>
    </>
  );
}
