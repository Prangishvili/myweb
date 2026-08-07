export const site = {
  name: "Oto Prangi",
  role: "Senior Product Designer",
  bio: "Senior Product Designer based in Tbilisi, Georgia, with over a decade of specialized experience in crafting human interfaces, scalable design systems, and end-to-end user experiences for complex digital products.",
  previously:
    "Previously at Videoshops, Silknet, Ownic, Toptal, Geolab, Adjara Group, GMFA: Georgian Museum of Fine Arts, MRKT, Leavignstone",
  links: [
    { label: "hello@otoprangi.com", href: "mailto:hello@otoprangi.com" },
    { label: "Schedule a Call", href: "https://calendar.app.google/WJVjHi1QGweHhdqeA" },
  ],
};

export type WorkItem = {
  title: string;
  image?: string;
  video?: string;
  hoverImage?: string;
  href?: string;
};

export const work: WorkItem[] = [
  { title: "Reel", video: "/work/reel.mp4" },
  { title: "Shuko", image: "/work/shuko.png" },
  { title: "Fitness", image: "/work/fitness.png" },
  { title: "AISI", image: "/work/aisi.png" },
  {
    title: "Silk",
    image: "/work/silk-1.jpg",
    hoverImage: "/work/silk-2.jpg",
    href: "/work/silk",
  },
];
