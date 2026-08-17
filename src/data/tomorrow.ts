export type CaseStudyImage = {
  src: string;
  aspect: number;
  flip?: boolean;
  half?: boolean;
};

export const tomorrow = {
  title: "Tomorrow's Spaces",
  description:
    "Tomorrow's Spaces is a concept exploring how digital products and interfaces might look and feel in the years ahead — placeholder copy, update with the real project description.",
  hero: { src: "/work/tomorrow/01-hero.webp", aspect: 5334 / 3000 },
  images: [
    { src: "/work/tomorrow/02-web.webp", aspect: 5334 / 3000 },
    { src: "/work/tomorrow/03-store.webp", aspect: 5334 / 3000 },
    { src: "/work/tomorrow/04-mobile.webp", aspect: 5334 / 3000 },
    { src: "/work/tomorrow/05-product.webp", aspect: 5334 / 3000 },
    { src: "/work/tomorrow/06-collection.webp", aspect: 5334 / 3000 },
    { src: "/work/tomorrow/07-device.webp", aspect: 5334 / 3000 },
  ] satisfies CaseStudyImage[],
};
