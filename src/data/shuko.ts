import type { CaseStudyImage } from "@/data/silk";

export const shuko = {
  title: "Shuko",
  description:
    "Life meant to be enjoyed and our colorful delicious Shu pastries are made to bring joy and laughter to everyone who visits us.",
  hero: { src: "/work/shuko/hero.jpg", aspect: 1920 / 1080 },
  images: [
    { src: "/work/shuko/01-cup.jpg", aspect: 1920 / 1080 },
    { src: "/work/shuko/02-team.jpg", aspect: 1920 / 1080 },
    { src: "/work/shuko/03-spoon-closeup.jpg", aspect: 1920 / 1080 },
    { src: "/work/shuko/04-social.jpg", aspect: 1920 / 1080 },
    { src: "/work/shuko/05-truck.jpg", aspect: 1920 / 1080 },
    { src: "/work/shuko/06-logo.jpg", aspect: 1920 / 1080 },
    { src: "/work/shuko/08-pattern.jpg", aspect: 1920 / 1080 },
  ] satisfies CaseStudyImage[],
};
