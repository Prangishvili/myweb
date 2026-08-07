export type CaseStudyImage = {
  src: string;
  aspect: number;
  flip?: boolean;
  half?: boolean;
};

export const silk = {
  title: "Silk",
  description:
    "Silk is a fintech super app that brings banking, crypto trading, marketplace, and real-time communications into a single platform. The product architecture spans four distinct verticals, each with its own data structures, user flows, and interaction patterns — unified under one design system and visual language. The app totals over 5,000 screens, covering everything from dense financial dashboards and trading interfaces to conversational UI and marketplace listings. The design system was built from the ground up with scalable tokens, modular components, and documented variants to maintain coherence across all verticals at scale.",
  hero: { src: "/work/silk/hero.png", aspect: 1888 / 680 },
  images: [
    { src: "/work/silk/01-monitor.jpg", aspect: 1888 / 1258 },
    { src: "/work/silk/02-cards.png", aspect: 1888 / 1062 },
    { src: "/work/silk/03-phone-hand.jpg", aspect: 1888 / 1250 },
    { src: "/work/silk/04-billboard.jpg", aspect: 1888 / 1250 },
    { src: "/work/silk/05-tablet.jpg", aspect: 1888 / 1250, flip: true },
    { src: "/work/silk/06a-green.jpg", aspect: 934 / 617, flip: true, half: true },
    { src: "/work/silk/06b-yellow.jpg", aspect: 934 / 617, half: true },
    { src: "/work/silk/07-closeup.jpg", aspect: 1888 / 1250, flip: true },
    { src: "/work/silk/08-storefront.jpg", aspect: 1888 / 1250 },
    { src: "/work/silk/09-dashboard.png", aspect: 1888 / 1250 },
  ] satisfies CaseStudyImage[],
};
