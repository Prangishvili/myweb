import type { Metadata } from "next";
import localFont from "next/font/local";
import SchemaMarkup from "@/components/SchemaMarkup";
import { CDN_BASE } from "@/data/cdn";
import "./globals.css";

const switzer = localFont({
  variable: "--font-switzer",
  src: [
    { path: "../fonts/switzer/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/switzer/Switzer-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/switzer/Switzer-Bold.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://otoprangi.com"),
  title: "Oto Prangi — Senior Product Designer & Design Systems Expert",
  description:
    "Senior Product Designer with 15+ years crafting user interfaces, design systems, and digital products. Specializing in product design, creative direction, and human-centered experiences.",
  keywords: ["Product Designer", "UI/UX Designer", "Design Systems", "Digital Products", "Tbilisi"],
  openGraph: {
    title: "Oto Prangi — Senior Product Designer",
    description:
      "Senior Product Designer with 15+ years of experience in creating digital products and design systems.",
    images: [`${CDN_BASE}/og-image.jpg`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oto Prangi — Senior Product Designer",
    description:
      "Senior Product Designer with 15+ years of experience in creating digital products and design systems.",
    images: [`${CDN_BASE}/og-image.jpg`],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${switzer.variable} h-full antialiased`}>
      <head>
        <SchemaMarkup />
      </head>
      <body className="min-h-full flex flex-col bg-white text-black">{children}</body>
    </html>
  );
}
