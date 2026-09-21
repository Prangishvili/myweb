"use client";

import { useState } from "react";
import { site } from "@/data/content";
import Reveal from "@/components/Reveal";

export default function About() {
  const [phoneOpen, setPhoneOpen] = useState(false);

  return (
    <section className="mx-[0.5rem] my-24 flex flex-col items-center gap-8 px-6 text-center sm:my-32 sm:gap-10 sm:px-10">
      <Reveal>
        <p className="max-w-[90rem] font-serif text-[28px] leading-[1.25] font-semibold sm:text-[48px]">
          I work as a Senior Product Designer with local and international teams. I design what users see and how
          they navigate through digital products, from early strategy to the final product engineers build. Fifteen
          years of experience across apps, platforms, and brands.
        </p>
      </Reveal>
      <Reveal delay={80}>
        <div className="flex flex-col items-center gap-4">
          <p className="max-w-[90rem] font-serif text-[28px] leading-[1.25] font-semibold sm:text-[48px]">
            {site.links.map((link, i) => {
              const external = link.href.startsWith("http");
              const isPhone = link.href.startsWith("tel:");
              return (
                <span key={link.label}>
                  {isPhone ? (
                    <button type="button" onClick={() => setPhoneOpen((open) => !open)} className="hover:opacity-60">
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="hover:opacity-60"
                    >
                      {link.label}
                    </a>
                  )}
                  {i < site.links.length - 1 && <span>, </span>}
                </span>
              );
            })}
          </p>
          {phoneOpen && (
            <p className="flex gap-6 rounded-2xl bg-black/5 px-6 py-4 font-sans text-[15px] leading-[25px] font-semibold uppercase sm:gap-10">
              <a href={site.links[0].href} className="hover:opacity-60">
                Call
              </a>
              <a
                href={`https://wa.me/${site.links[0].href.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60"
              >
                WhatsApp
              </a>
            </p>
          )}
        </div>
      </Reveal>
    </section>
  );
}
