import Image from "next/image";
import Link from "next/link";
import { work } from "@/data/content";
import ShuffleImage from "@/components/ShuffleImage";

export default function Work() {
  return (
    <section
      id="work"
      className="grid scroll-mt-28 grid-cols-1 gap-2.5 px-2.5 pb-2.5 sm:grid-cols-2 sm:gap-5 sm:px-5 sm:pb-5 sm:scroll-mt-36"
    >
      {work.map((item) => {
        const tile = (
          <div
            className="group relative aspect-square overflow-hidden"
            style={{ backgroundColor: item.bg ?? "#000" }}
          >
            {item.video ? (
              <video
                src={item.video}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 size-full object-contain"
              />
            ) : item.hoverImages ? (
              <ShuffleImage cover={item.image!} images={item.hoverImages} alt={item.title} />
            ) : (
              <Image
                src={item.image!}
                alt={item.title}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            )}
          </div>
        );

        return item.href ? (
          <Link key={item.title} href={item.href}>
            {tile}
          </Link>
        ) : (
          <div key={item.title}>{tile}</div>
        );
      })}
    </section>
  );
}
