"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site, cv } from "@/data/content";

const navItems = [
  { label: "Works", href: "/work" },
  { label: "Exhibition", href: "https://reply.gallery", external: true },
  { label: "Motion", href: "/work/motion-works" },
];

export default function Header() {
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    if (!infoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInfoOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [infoOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex sm:grid sm:grid-cols-12 items-start font-sans text-[15px] leading-[25px] font-semibold mt-[0.5rem] mx-[0.7rem] mb-[0.7rem] gap-[0.75rem] sm:gap-[1rem]">
        <Link href="/" onClick={() => setInfoOpen(false)} className="shrink-0 whitespace-nowrap sm:col-span-1">
          {site.name}
        </Link>
        <div className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap sm:min-w-0 sm:flex-none sm:overflow-visible sm:whitespace-normal sm:col-start-4 sm:col-span-5">
          {navItems.map((item, i) => (
            <span key={item.label}>
              {item.external ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-60">
                  {item.label}
                </a>
              ) : (
                <Link href={item.href} onClick={() => setInfoOpen(false)} className="hover:opacity-60">
                  {item.label}
                </Link>
              )}
              {i < navItems.length - 1 && <span>, </span>}
            </span>
          ))}
        </div>
        <button type="button" onClick={() => setInfoOpen((open) => !open)} className="shrink-0 sm:col-span-1 sm:ml-auto hover:opacity-60">
          Information
        </button>
      </header>

      {infoOpen && (
        <div
          className="fixed inset-0 z-40 overflow-y-auto bg-[rgba(217,217,217,0.18)] px-6 pt-24 pb-16 backdrop-blur-[184px] sm:px-10 sm:pt-28"
          onClick={() => setInfoOpen(false)}
        >
          <div className="flex flex-col gap-6 font-serif text-2xl leading-[1.3] font-semibold sm:gap-10 sm:text-[48px]">
            {cv.map((section) => (
              <p key={section.heading} onClick={(e) => e.stopPropagation()}>
                {section.heading.toUpperCase()}
                <br />
                {section.items.map((item, i) => (
                  <span key={item}>
                    {item}
                    {i < section.items.length - 1 && <br />}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
