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
  hero: { src: "/work/ray/hero.jpg", aspect: 1888 / 680 },
  images: [
    { src: "/work/ray/Frame 238.jpg", aspect: 1888 / 1258 },
    { src: "/work/ray/Frame 239.jpg", aspect: 1888 / 1062 },
    { src: "/work/ray/Frame 249.jpg", aspect: 1888 / 1250 },
    { src: "/work/ray/Frame 250.jpg", aspect: 1888 / 1250 },
    { src: "/work/ray/Frame 261.jpg", aspect: 1888 / 1250, flip: true },
    { src: "/work/ray/Frame 262.jpg", aspect: 934 / 617, flip: true, half: true },
    { src: "/work/ray/Frame 266.jpg", aspect: 934 / 617, half: true },
    { src: "/work/ray/Frame 274.jpg", aspect: 1888 / 1250, flip: true },
    { src: "/work/ray/Frame 275.jpg", aspect: 1888 / 1250 },
    { src: "/work/ray/Rez.jpg", aspect: 1888 / 1250 },
  ] satisfies CaseStudyImage[],
};
