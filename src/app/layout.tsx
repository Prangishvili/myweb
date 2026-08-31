import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
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

const TITLE = "Oto Prangi";
const DESCRIPTION = "Interfaces, design systems, motion, and brand identity.";

export const metadata: Metadata = {
  metadataBase: new URL("https://otoprangi.com"),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "UI Designer Tbilisi",
    "Product Designer Tbilisi",
    "UI/UX Designer",
    "Design Systems",
    "Digital Products",
    "Tbilisi",
    "Georgia",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [`${CDN_BASE}/og-image.jpg`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
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
      <GoogleAnalytics gaId="G-L37RL2QB78" />
    </html>
  );
}
