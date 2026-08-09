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
  hero: { src: "/work/tomorrow/cover.jpg", aspect: 1888 / 680 },
  images: [
    { src: "/work/tomorrow/Frame 225.jpg", aspect: 16 / 9 },
    { src: "/work/tomorrow/Frame 228.jpg", aspect: 16 / 9 },
    { src: "/work/tomorrow/Frame 230.jpg", aspect: 16 / 9 },
    { src: "/work/tomorrow/Frame 233.jpg", aspect: 16 / 9 },
    { src: "/work/tomorrow/Frame 234.jpg", aspect: 16 / 9 },
    { src: "/work/tomorrow/Frame 237.jpg", aspect: 16 / 9 },
  ] satisfies CaseStudyImage[],
};
