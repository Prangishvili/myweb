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
  hero: { src: "/work/aisi/cover.jpg", aspect: 1888 / 680 },
  images: [
    { src: "/work/aisi/Frame 35.jpg", aspect: 16 / 9 },
    { src: "/work/aisi/Frame 41.png", aspect: 16 / 9 },
    { src: "/work/aisi/Frame 156.png", aspect: 16 / 9 },
    { src: "/work/aisi/Frame 175.png", aspect: 16 / 9 },
    { src: "/work/aisi/Frame 190.png", aspect: 16 / 9 },
    { src: "/work/aisi/Frame 253.jpg", aspect: 16 / 9 },
  ] satisfies CaseStudyImage[],
};
