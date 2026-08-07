import Image from "next/image";
import Link from "next/link";
import { work } from "@/data/content";

export default function Work() {
  return (
    <section id="work" className="grid grid-cols-1 gap-2.5 px-2.5 pb-2.5 sm:grid-cols-2 sm:gap-5 sm:px-5 sm:pb-5">
      {work.map((item) => {
        const tile = (
          <div className="group relative aspect-square overflow-hidden bg-black">
            {item.video ? (
              <video
                src={item.video}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 size-full object-contain"
              />
            ) : (
              <Image
                src={item.image!}
                alt={item.title}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            )}
            {item.hoverImage && (
              <Image
                src={item.hoverImage}
                alt=""
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
