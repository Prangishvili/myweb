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

export const showreel: string[] = [
  "/work/showreel/earth-observation.mp4",
  "/work/showreel/teliani-valley.mp4",
  "/work/showreel/videoshops.mp4",
  "/work/showreel/ai-promo.mp4",
  "/work/showreel/concept-chat.mp4",
  "/work/showreel/Inspiration%20Creating.mp4",
  "/work/showreel/Inspiration%20Themes.mp4",
  "/work/showreel/maestro.mp4",
  "/work/showreel/fisa.mp4",
  "/work/showreel/screen-recording-1.mp4",
  "/work/showreel/screen-recording-2.mp4",
  "/work/showreel/tbilisi-contemporary-ballet.mp4",
  "/work/showreel/mural-fest-tbilisi.mp4",
  "/work/showreel/movement-tv.mp4",
  "/work/showreel/the-movement.mp4",
  "/work/showreel/national-geographic.mp4",
];

export type WorkItem = {
  title: string;
  image?: string;
  hoverImages?: string[];
  video?: string;
  href?: string;
  bg?: string;
};

export const work: WorkItem[] = [
  {
    title: "Motion Works",
    video: "/work/reel/cover.m4v",
    href: "/work/motion-works",
  },
  {
    title: "Shuko",
    image: "/work/shuko/cover.jpg",
    hoverImages: [
      "/work/shuko/06-logo.jpg",
      "/work/shuko/01-cup.jpg",
      "/work/shuko/02-team.jpg",
      "/work/shuko/03-spoon-closeup.jpg",
      "/work/shuko/04-social.jpg",
      "/work/shuko/05-truck.jpg",
      "/work/shuko/08-pattern.jpg",
    ],
    href: "/work/shuko",
  },
  { title: "Fitness", image: "/work/fitness/cover.jpg" },
  {
    title: "Inspiration",
    video: "/work/inspiration/cover.m4v",
    href: "/work/inspiration",
  },
  { title: "AISI", image: "/work/aisi/cover.jpg" },
  {
    title: "Silk",
    image: "/work/silk/01-monitor.jpg",
    href: "/work/silk",
  },
];
