"use client";

import Image from "next/image";
import Link from "next/link";
import { work } from "@/data/content";
import ShuffleImage from "@/components/ShuffleImage";
import Reveal from "@/components/Reveal";

interface ProjectSliderProps {
  currentProjectTitle: string;
}

export default function ProjectSlider({ currentProjectTitle }: ProjectSliderProps) {
  const projects = work.filter((item) => item.title !== currentProjectTitle);

  return (
    <section className="mt-10 pt-10 sm:mt-16 sm:pt-16">
      <div className="mx-[0.5rem] mb-8 text-center sm:mx-[0.5rem] sm:mb-12">
        <h2 className="text-4xl font-semibold sm:text-6xl">Next Project</h2>
      </div>
      <div className="grid grid-cols-1 gap-[0.5rem] px-[0.5rem] sm:grid-cols-2 sm:gap-5 sm:px-[0.5rem]">
        {projects.slice(0, 4).map((item, index) => {
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

          const external = item.href?.startsWith("http");
          return (
            <Reveal key={item.title} delay={(index % 2) * 80}>
              {item.href ? (
                <Link href={item.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
                  {tile}
                </Link>
              ) : (
                tile
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
