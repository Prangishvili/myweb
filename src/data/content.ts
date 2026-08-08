export const site = {
  name: "Oto Prangi",
  bio: "Oto Prangi is a Tbilisi-based Senior Product Designer with over a decade of specialized experience in crafting human interfaces, scalable design systems, and end-to-end user experiences for complex digital products. Previously at Videoshops, Silknet, Toptal, Geolab, Adjara Group, Georgian Museum of Fine Arts, MRKT, Leavignstone",
  links: [
    { label: "+995 593 26 11 77", href: "tel:+995593261177" },
    { label: "hello@otoprangi.com", href: "mailto:hello@otoprangi.com" },
  ],
};

export const cv: { heading: string; items: string[] }[] = [
  {
    heading: "Education",
    items: ["2017–2021 B.A. Visual and Performing Arts, Georgian Institute of Public Affairs"],
  },
  {
    heading: "Experience",
    items: [
      "2026 Inspiration, Digital Product Designer, New York, United States",
      "2025 Videoshops, Digital Product Designer, New York, United States",
      "2020 Adjarabet, Product Designer, Tbilisi, Georgia",
      "2019 Toptal, Digital Product Designer, International",
      "2019 MRKT.COM, Product Designer",
      "2013 Leavingstone, UI/UX Designer & Graphic Designer, Tbilisi, Georgia",
    ],
  },
  {
    heading: "Teaching",
    items: [
      "2026 Free University of Tbilisi, UI/UX and Motion Design Lecturer",
      "2015 GeoLab, UI/UX Design Lecturer, Tbilisi, Georgia",
    ],
  },
  {
    heading: "Recognition",
    items: ["2019 Awwwards, Site of the Day"],
  },
  {
    heading: "Selected Clients & Projects",
    items: ["Silknet, Adjara Group, Georgian Museum of Fine Arts"],
  },
];

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
  { title: "Tomorrow's Spaces", image: "/work/tomorrow/cover.jpg" },
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
