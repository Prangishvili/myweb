export const site = {
  name: "Oto Prangi",
  bio: "I work as a Senior Product Designer with local and international teams, offering creative direction, user experiences, and interface design with over fifteen years of knowledge in building digital products.",
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
    title: "Inspiration",
    video: "/work/inspiration/cover.m4v",
    href: "/work/inspiration",
  },
  {
    title: "Kao",
    video: "/work/kao/cover.mp4",
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
  {
    title: "Silk",
    image: "/work/silk/01-monitor.jpg",
    hoverImages: [
      "/work/silk/02-cards.png",
      "/work/silk/03-phone-hand.jpg",
      "/work/silk/04-billboard.jpg",
      "/work/silk/05-tablet.jpg",
      "/work/silk/06a-green.jpg",
      "/work/silk/06b-yellow.jpg",
      "/work/silk/07-closeup.jpg",
      "/work/silk/08-storefront.jpg",
      "/work/silk/09-dashboard.png",
    ],
    href: "/work/silk",
  },
  {
    title: "Ray",
    image: "/work/ray/cover.jpg",
    hoverImages: [
      "/work/ray/Frame 238.jpg",
      "/work/ray/Frame 239.jpg",
      "/work/ray/Frame 249.jpg",
      "/work/ray/Frame 250.jpg",
      "/work/ray/Frame 261.jpg",
      "/work/ray/Frame 262.jpg",
      "/work/ray/Frame 266.jpg",
      "/work/ray/Frame 274.jpg",
      "/work/ray/Frame 275.jpg",
      "/work/ray/Rez.jpg",
    ],
    href: "/work/ray",
  },
  {
    title: "Tomorrow's Spaces",
    image: "/work/tomorrow/cover.jpg",
    hoverImages: [
      "/work/tomorrow/Frame 225.jpg",
      "/work/tomorrow/Frame 228.jpg",
      "/work/tomorrow/Frame 230.jpg",
      "/work/tomorrow/Frame 233.jpg",
      "/work/tomorrow/Frame 234.jpg",
      "/work/tomorrow/Frame 237.jpg",
    ],
    href: "/work/tomorrow",
  },
  {
    title: "AISI",
    image: "/work/aisi/cover.jpg",
    hoverImages: [
      "/work/aisi/Frame 35.jpg",
      "/work/aisi/Frame 41.png",
      "/work/aisi/Frame 156.png",
      "/work/aisi/Frame 175.png",
      "/work/aisi/Frame 190.png",
      "/work/aisi/Frame 253.jpg",
    ],
    href: "/work/aisi",
  },
];
