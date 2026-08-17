export type CaseStudyImage = {
  src: string;
  aspect: number;
  flip?: boolean;
  half?: boolean;
};

export const aisi = {
  title: "AISI",
  description:
    "Discover over 500 luxury labels, emerging designers, and streetwear brands for both men and women. SHIPPING GLOBALLY.",
  hero: { src: "/work/aisi/01-hero.webp", aspect: 5334 / 3000 },
  images: [
    { src: "/work/aisi/02-mobile.webp", aspect: 5334 / 3000 },
    { src: "/work/aisi/03-desktop.webp", aspect: 5334 / 3000 },
    { src: "/work/aisi/04-screens.webp", aspect: 5334 / 3000 },
    { src: "/work/aisi/05-selling.webp", aspect: 5334 / 3000 },
    { src: "/work/aisi/06-collection.webp", aspect: 5334 / 3000 },
  ] satisfies CaseStudyImage[],
};
