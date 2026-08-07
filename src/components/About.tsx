import { site } from "@/data/content";

export default function About() {
  return (
    <section
      id="about"
      className="flex max-w-[1007px] flex-col gap-6 px-6 pb-24 pt-24 font-serif text-2xl sm:gap-12 sm:px-10 sm:pt-28 sm:text-[32px]"
    >
      <p className="max-w-[750px] leading-[1.7]">{site.bio}</p>
      <p className="max-w-[745px] leading-[1.6]">{site.previously}</p>
      <ul id="contact" className="flex flex-col gap-3 font-sans text-base font-normal sm:gap-6">
        {site.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-from-font underline-offset-4 hover:opacity-60"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
