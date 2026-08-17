"use client";

import Image from "next/image";
import Link from "next/link";
import { work } from "@/data/content";
import LazyVideo from "@/components/LazyVideo";
import ShuffleImage from "@/components/ShuffleImage";
import Reveal from "@/components/Reveal";
import { useCurtain } from "@/components/TransitionCurtain";
import { getProjectPalette } from "@/data/projectPalettes";

export default function Work() {
  const triggerCurtain = useCurtain();

  return (
    <section
      id="work"
      className="grid scroll-mt-28 grid-cols-1 gap-[0.5rem] sm:grid-cols-2 sm:scroll-mt-36 mx-[0.5rem] mb-24"
    >
      {work.map((item, index) => {
        const cover = (
          <div
            className="group relative aspect-square overflow-hidden"
            style={{ backgroundColor: item.bg ?? "#000" }}
          >
            {item.video ? (
              <LazyVideo
                src={item.video}
                poster={item.poster!}
                alt={item.title}
                className="size-full object-contain"
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

        const palette = getProjectPalette(item.href);
        const tile = item.href ? (
          <Link key={item.title} href={item.href} onNavigate={palette ? () => triggerCurtain(palette) : undefined}>
            {cover}
          </Link>
        ) : (
          <div key={item.title}>{cover}</div>
        );

        return (
          <Reveal key={item.title} delay={(index % 2) * 80}>
            {tile}
            <p className="text-sm font-semibold mt-2 mb-4">{item.title}</p>
          </Reveal>
        );
      })}
    </section>
  );
}
