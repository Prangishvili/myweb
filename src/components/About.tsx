import { site } from "@/data/content";

export default function About() {
  return (
    <section
      id="about"
      className="flex flex-col gap-6 pb-24 pt-24 font-serif text-2xl font-semibold sm:gap-12 sm:pt-28 sm:text-[48px] m-[0.5rem]"
    >
      <p className="leading-[1.5] sm:leading-[54px]">{site.bio}</p>
      <p id="contact" className="leading-[1.5] sm:leading-[54px]">
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
      </p>
    </section>
  );
}
