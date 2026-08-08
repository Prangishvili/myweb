import type { Metadata } from "next";
import localFont from "next/font/local";
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
  title: "Oto Prangi",
  description:
    "Product Designer based in Tbilisi, Georgia, crafting human interfaces, digital products, and brand identities.",
  openGraph: {
    title: "Oto Prangi",
    description:
      "Product Designer based in Tbilisi, Georgia, crafting human interfaces, digital products, and brand identities.",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oto Prangi",
    description:
      "Product Designer based in Tbilisi, Georgia, crafting human interfaces, digital products, and brand identities.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${switzer.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-black">{children}</body>
    </html>
  );
}
