"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site, cv } from "@/data/content";
import { scrollToSection } from "@/components/SmoothScroll";

const navItems = [
  { label: "Works", href: "/#work" },
  { label: "Exhibition", href: "https://reply.gallery", external: true },
  { label: "Motion", href: "/work/motion-works" },
];

function dispatchElementHover(id: string | null) {
  window.dispatchEvent(new CustomEvent("header-hover", { detail: id }));
}

export default function Header() {
  const pathname = usePathname();
  const [infoOpen, setInfoOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [inverted, setInverted] = useState(false);

  useEffect(() => {
    if (!infoOpen && !contactOpen && !menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setInfoOpen(false);
        setContactOpen(false);
        setPhoneOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [infoOpen, contactOpen, menuOpen]);

  useEffect(() => {
    function onScroll() {
      const marker = document.getElementById("header-invert-start");
      setInverted(marker ? marker.getBoundingClientRect().top <= 80 : false);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={`transition-colors duration-300 ${inverted ? "text-black" : ""}`}>
      <header
        className="fixed inset-x-0 top-0 z-50 flex sm:grid sm:grid-cols-12 items-start font-sans text-[15px] leading-[25px] font-semibold uppercase mt-[0.5rem] mx-[0.7rem] mb-[0.7rem] gap-[0.75rem] sm:gap-[1rem]"
        style={{ viewTransitionName: "site-header" } as React.CSSProperties}
      >
        <Link
          href="/"
          onClick={() => {
            setInfoOpen(false);
            setContactOpen(false);
            setPhoneOpen(false);
            setMenuOpen(false);
          }}
          onMouseEnter={() => dispatchElementHover("brand")}
          onMouseLeave={() => dispatchElementHover(null)}
          className="shrink-0 whitespace-nowrap sm:col-span-1"
        >
          {site.name}
        </Link>
        <div className="hidden sm:col-start-4 sm:col-span-5 sm:block">
          {navItems.map((item, i) => (
            <span key={item.label}>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => dispatchElementHover(item.label)}
                  onMouseLeave={() => dispatchElementHover(null)}
                  className="hover:opacity-60"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  onClick={(e) => {
                    setInfoOpen(false);
                    setContactOpen(false);
                    if (item.label === "Works" && pathname === "/") {
                      e.preventDefault();
                      scrollToSection("work");
                    }
                  }}
                  onMouseEnter={() => dispatchElementHover(item.label)}
                  onMouseLeave={() => dispatchElementHover(null)}
                  className="hover:opacity-60"
                >
                  {item.label}
                </Link>
              )}
              {i < navItems.length - 1 && <span>, </span>}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setContactOpen(false);
            setInfoOpen((open) => !open);
          }}
          onMouseEnter={() => dispatchElementHover("Information")}
          onMouseLeave={() => dispatchElementHover(null)}
          className="hidden shrink-0 uppercase sm:col-span-1 sm:ml-auto sm:block hover:opacity-60"
        >
          Information
        </button>
        <button
          type="button"
          onClick={() => {
            setInfoOpen(false);
            setContactOpen((open) => !open);
            setPhoneOpen(false);
          }}
          onMouseEnter={() => dispatchElementHover("Contact")}
          onMouseLeave={() => dispatchElementHover(null)}
          className="hidden shrink-0 uppercase sm:col-start-12 sm:ml-auto sm:block hover:opacity-60"
        >
          Contact
        </button>
        <button
          type="button"
          onClick={() => {
            setInfoOpen(false);
            setContactOpen(false);
            setPhoneOpen(false);
            setMenuOpen((open) => !open);
          }}
          className="ml-auto shrink-0 uppercase hover:opacity-60 sm:hidden"
        >
          Menu
        </button>
      </header>

      {menuOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto overscroll-contain bg-[rgba(217,217,217,0.18)] px-6 backdrop-blur-[184px] sm:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex flex-col items-center gap-6 text-center font-serif text-3xl leading-[1.3] font-semibold">
            {navItems.map((item) =>
              item.external ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-60">
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    setMenuOpen(false);
                    if (item.label === "Works" && pathname === "/") {
                      e.preventDefault();
                      scrollToSection("work");
                    }
                  }}
                  className="hover:opacity-60"
                >
                  {item.label}
                </Link>
              )
            )}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setInfoOpen(true);
              }}
              className="hover:opacity-60"
            >
              Information
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setContactOpen(true);
              }}
              className="hover:opacity-60"
            >
              Contact
            </button>
          </div>
        </div>
      )}

      {infoOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-[rgba(217,217,217,0.18)] px-6 pt-24 pb-16 backdrop-blur-[184px] sm:px-10 sm:pt-28"
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

      {contactOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto overscroll-contain bg-[rgba(217,217,217,0.18)] px-6 backdrop-blur-[184px] sm:px-10"
          onClick={() => {
            setContactOpen(false);
            setPhoneOpen(false);
          }}
        >
          <div className="flex flex-col gap-6 text-center font-serif text-2xl leading-[1.3] font-semibold sm:gap-10 sm:text-[48px]">
            <p onClick={(e) => e.stopPropagation()}>Let&apos;s talk</p>
            <p onClick={(e) => e.stopPropagation()}>
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
              <p
                className="flex justify-center gap-6 rounded-2xl bg-black/5 px-6 py-4 text-base font-sans font-semibold uppercase sm:gap-10 sm:px-10 sm:py-6 sm:text-xl"
                onClick={(e) => e.stopPropagation()}
              >
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
        </div>
      )}
    </div>
  );
}
