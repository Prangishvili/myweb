export type CaseStudyImage = {
  src: string;
  aspect: number;
  flip?: boolean;
  half?: boolean;
  caption?: { title: string; body: string };
  videos?: { src: string; aspect: number }[];
};

export const silk = {
  title: "Silk",
  description:
    "Silk is a fintech super app that unifies banking, crypto trading, marketplace, and real-time communications into a single platform. The product was designed entirely by one person — over 5,000 screens across four distinct verticals, each with its own data logic, compliance requirements, and user expectations, built to behave as one coherent system rather than four separate products sharing a shell.\n\nThe design work covered the full lifecycle: information architecture, user flows, a design system built from scratch with scalable tokens, modular components, and documented variants — all the way through to interactive prototypes and production-ready deliverables. The central challenge was structural: making dense financial dashboards, trading interfaces, marketplace listings, and conversational UI coexist under one visual and interaction language without any of them feeling like a compromise.\n\nThe product spans desktop, tablet, and mobile. Navigation adapts per vertical while the underlying patterns stay consistent, so moving between banking and messaging or crypto and marketplace feels like changing rooms in the same building — not switching apps. On mobile, data-heavy views rely on progressive disclosure and prioritized hierarchy to keep complex financial information legible without dumbing it down.\n\nThe brand identity was developed alongside the product — a system that carries the same clarity and tone into marketing materials, outdoor advertising, and physical touchpoints. Design decisions were communicated directly to C-level stakeholders throughout the project, keeping the work aligned with business strategy at every stage.",
  appStore: {
    name: "Silk Bank",
    about: "Manage your funds, transfer instantly, and pay — all without commission fees.",
    icon: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/appstore-icon.webp",
    url: "https://apps.apple.com/us/app/silk-bank/id6463405199",
  },
  credits: [
    { label: "Senior Product Designer", value: "Oto Prangi" },
    { label: "Creative Direction", value: "Giga Kobidze" },
    { label: "Client", value: "Silk" },
    { label: "Year", value: "2024–2025" },
    { label: "Scope", value: "IA, UX, Design System, Brand Identity" },
    { label: "Platforms", value: "Desktop, Tablet, Mobile" },
  ],
  hero: { src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/00-hero.webp", aspect: 1888 / 680 },
  images: [
    {
      src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/01-hero.webp",
      aspect: 16 / 9,
      caption: {
        title: "Image 1 — Desktop Dashboard",
        body: "Silk was designed as a super app from day one — banking, crypto, communication, and loyalty living under one roof. The desktop view condenses that ambition into a single surface, prioritizing what users check most: recent activity, balances, and people they transact with. Every element earns its place on screen.",
      },
    },
    {
      src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/02-Grid.webp",
      aspect: 16 / 9,
      caption: {
        title: "Image 2 — Product Ecosystem",
        body: "Five distinct product verticals, one coherent design language. The challenge with a platform this broad was making each service feel native to the whole without flattening their individual identity. Navigation adapts per vertical while the typographic and spatial system stays locked — that consistency is what holds 5,000+ screens together.",
      },
    },
    {
      src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/03-Chat.webp",
      aspect: 16 / 9,
      caption: {
        title: "Image 3 — Group Chat",
        body: "Messaging lives inside Silk because money moves between people, not accounts. Embedding payments directly into conversation removes the friction of switching apps to split a dinner or settle a debt — the financial action becomes part of the social context where it naturally belongs.",
      },
    },
    {
      src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/04-Banner.webp",
      aspect: 16 / 9,
      caption: {
        title: "Image 4 — Brand Campaign",
        body: "The identity system was built to work as hard off-screen as on it. Typography, color, and tone carry the brand across physical touchpoints without relying on UI screenshots to explain what the product does — the brand stands on its own.",
      },
    },
    {
      src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/05-Tablet.webp",
      aspect: 16 / 9,
      caption: {
        title: "Image 5 — Financial Reports, Tablet",
        body: "The wider canvas isn't just a scaled-up phone — it's a different use case entirely. This is where users sit down and think about their money rather than glance at it. The layout treats the tablet as a personal finance dashboard, surfacing spending patterns, net worth, and upcoming obligations in a single, analytical view.",
      },
    },
    {
      src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/06-Mobile.webp",
      aspect: 16 / 9,
      caption: {
        title: "Image 6 — Banking & Loyalty, Mobile",
        body: "Two sides of the same system. Color coding does the heavy lifting in signaling which vertical you're in, while the structural patterns stay familiar so there's zero learning curve moving between them. The loyalty program ties spending behavior back to rewards, giving users a reason to keep Silk as their primary platform.",
      },
    },
    {
      src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/videos/01.mp4",
      aspect: 16 / 9,
      videos: [
        { src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/videos/01.mp4", aspect: 3084 / 1994 },
        { src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/videos/02.mp4", aspect: 3916 / 2206 },
        { src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/videos/03.mp4", aspect: 1052 / 2264 },
        { src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/videos/04.mp4", aspect: 1044 / 2258 },
        { src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/videos/05.mp4", aspect: 1044 / 2258 },
      ],
    },
    {
      src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/07-Marketplace.webp",
      aspect: 2180 / 1455,
      caption: {
        title: "Image 7 — Marketplace",
        body: "Silk's ambition goes beyond finance into commerce. A curated storefront inside the app turns the platform into a destination rather than a utility — users don't just manage money here, they spend it. The light treatment separates the shopping context from the rest of the product visually, reinforcing the shift in mindset.",
      },
    },
    { src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/08-Silk.webp", aspect: 16 / 9 },
    { src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/09-Widgets.webp", aspect: 16 / 9 },
    { src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/10-Silk%20Logo.webp", aspect: 16 / 9 },
  ] satisfies CaseStudyImage[],
};
