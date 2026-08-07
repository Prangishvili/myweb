import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    <html lang="en" className={`${poppins.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-black">{children}</body>
    </html>
  );
}
