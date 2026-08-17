import { site } from "@/data/content";

export default function About() {
  return (
    <section
      id="about"
      className="flex flex-col items-center gap-6 pb-32 text-center font-serif text-[24px] font-semibold sm:gap-12 sm:text-[48px] m-[0.7rem]"
    >
      <p className="max-w-3xl leading-[1.2] text-[28px] sm:text-[64px] sm:leading-[68px]">{site.bio}</p>
      {/* <p id="contact" className="leading-[1.2] sm:leading-[54px]">
        {site.links.map((link, i) => {
          const external = link.href.startsWith("http");
          return (
            <span key={link.label}>
              <a
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="hover:opacity-60"
              >
                {link.label}
              </a>
              {i < site.links.length - 1 && <span>, </span>}
            </span>
          );
        })}
      </p> */}
    </section>
  );
}
