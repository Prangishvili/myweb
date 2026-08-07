import Link from "next/link";
import { site } from "@/data/content";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-start justify-between px-6 py-6 font-sans text-[15px] leading-[25px] font-medium sm:px-10">
      <Link href="/">
        {site.name}
        <br />
        {site.role}
      </Link>
      <ul className="flex gap-6 sm:gap-16">
        {nav.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="hover:opacity-60">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
