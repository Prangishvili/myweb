import type { CaseStudyImage } from "@/data/silk";
import { CDN_BASE } from "@/data/cdn";

export const shuko = {
  title: "Shuko",
  description:
    "Life meant to be enjoyed and our colorful delicious Shu pastries are made to bring joy and laughter to everyone who visits us.",
  hero: { src: `${CDN_BASE}/work/shuko/01-hero.webp`, aspect: 5334 / 3000 },
  images: [
    { src: `${CDN_BASE}/work/shuko/02-team.webp`, aspect: 5334 / 3000 },
    { src: `${CDN_BASE}/work/shuko/03-spoon-closeup.webp`, aspect: 5334 / 3000 },
    { src: `${CDN_BASE}/work/shuko/04-social.webp`, aspect: 5334 / 3000 },
    { src: `${CDN_BASE}/work/shuko/05-cup.webp`, aspect: 5334 / 3000 },
    { src: `${CDN_BASE}/work/shuko/06-shuko.webp`, aspect: 5334 / 3000 },
    { src: `${CDN_BASE}/work/shuko/07-grid.webp`, aspect: 5334 / 3000 },
    { src: `${CDN_BASE}/work/shuko/08-truck.webp`, aspect: 1920 / 1080 },
    { src: `${CDN_BASE}/work/shuko/09-logo.webp`, aspect: 5334 / 3000 },
  ] satisfies CaseStudyImage[],
};
