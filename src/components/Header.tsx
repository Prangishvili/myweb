"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site, cv } from "@/data/content";

const navItems = ["Works", "Exhibition", "Motion"];

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
      <header className="fixed inset-x-0 top-0 z-50 grid grid-cols-12 items-start font-sans text-[15px] leading-[25px] font-semibold m-[0.5rem] gap-[1rem]">
        <Link href="/" onClick={() => setInfoOpen(false)} className="col-span-1 whitespace-nowrap">
          {site.name}
        </Link>
        <div className="col-start-4 col-span-5">
          {navItems.map((item, i) => (
            <span key={item}>
              {item}
              {i < navItems.length - 1 && <span>, </span>}
            </span>
          ))}
        </div>
        <button type="button" onClick={() => setInfoOpen((open) => !open)} className="col-span-1 ml-auto hover:opacity-60">
          Information
        </button>
      </header>

      {infoOpen && (
        <div
          className="fixed inset-0 z-40 overflow-y-auto bg-[rgba(217,217,217,0.18)] px-6 pt-24 pb-16 backdrop-blur-[184px] sm:px-10 sm:pt-28"
          onClick={() => setInfoOpen(false)}
        >
          <div
            className="flex flex-col gap-6 font-serif text-2xl leading-[1.3] font-semibold sm:gap-10 sm:text-[48px]"
            onClick={(e) => e.stopPropagation()}
          >
            {cv.map((section) => (
              <p key={section.heading}>
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
