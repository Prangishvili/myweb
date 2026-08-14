export type CaseStudyImage = {
  src: string;
  aspect: number;
  flip?: boolean;
  half?: boolean;
};

export const ray = {
  title: "Ray",
  description:
    "The social workout app that connects you with gym friends for shared fitness goals and motivation. Compete, chat, or simply workout together.",
  credits: [
    { label: "Creative Direction", value: "Oto Prangi" },
    { label: "Client", value: "Ray" },
    { label: "Year", value: "2024" },
    { label: "Scope", value: "IA, UX, Design System, Brand Identity" },
    { label: "Platforms", value: "Desktop, Tablet, Mobile" },
  ],
  hero: { src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/ray/01-hero.webp", aspect: 5334 / 3000 },
  images: [
    { src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/ray/02-mobile.webp", aspect: 5334 / 3000 },
    { src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/ray/03-devices.webp", aspect: 5334 / 3000 },
    { src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/ray/04-grid.webp", aspect: 5334 / 3000 },
    { src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/ray/05-desktop.webp", aspect: 5334 / 3000 },
    { src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/ray/06-pages.webp", aspect: 5334 / 3000 },
    { src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/ray/07-screens.webp", aspect: 5334 / 3000 },
    { src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/ray/08-widget.webp", aspect: 5334 / 3000 },
    { src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/ray/09-chat.webp", aspect: 5334 / 3000 },
    { src: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/ray/10-logo.webp", aspect: 5334 / 3000 },
  ] satisfies CaseStudyImage[],
};
