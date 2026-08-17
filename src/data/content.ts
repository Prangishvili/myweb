export const site = {
  name: "Oto Prangi",
  bio: "Leading design wherever the discipline lines blur — AI, systems, brand, space.",
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
  poster?: string;
  href?: string;
  bg?: string;
};

export const work: WorkItem[] = [
  {
    title: "Silk",
    image: "/work/silk/01-hero.webp",
    hoverImages: [
      "/work/silk/thumbs/02-Grid.webp",
      "/work/silk/thumbs/03-Chat.webp",
      "/work/silk/thumbs/04-Banner.webp",
      "/work/silk/thumbs/05-Tablet.webp",
      "/work/silk/thumbs/06-Mobile.webp",
      "/work/silk/thumbs/07-Marketplace.webp",
      "/work/silk/thumbs/08-Silk.webp",
      "/work/silk/thumbs/09-Widgets.webp",
      "/work/silk/thumbs/10-Silk%20Logo.webp",
    ],
    href: "/work/silk",
  },
  {
    title: "Motion Works",
    video: "/work/reel/cover.m4v",
    poster: "/work/reel/cover.webp",
    href: "/work/motion-works",
  },
  {
    title: "Inspiration",
    video: "/work/inspiration/cover.m4v",
    poster: "/work/inspiration/cover.webp",
    href: "/work/inspiration",
  },
  {
    title: "Kao",
    video: "/work/kao/cover.mp4",
    poster: "/work/kao/cover.webp",
  },
  {
    title: "Shuko",
    image: "/work/shuko/00-cover.webp",
    hoverImages: [
      "/work/shuko/thumbs/02-team.webp",
      "/work/shuko/thumbs/03-spoon-closeup.webp",
      "/work/shuko/thumbs/04-social.webp",
      "/work/shuko/thumbs/05-cup.webp",
      "/work/shuko/thumbs/06-shuko.webp",
      "/work/shuko/thumbs/07-grid.webp",
      "/work/shuko/thumbs/08-truck.webp",
      "/work/shuko/thumbs/09-logo.webp",
    ],
    href: "/work/shuko",
  },
  {
    title: "Ray",
    image: "/work/ray/00-cover.webp",
    hoverImages: [
      "/work/ray/thumbs/02-mobile.webp",
      "/work/ray/thumbs/03-devices.webp",
      "/work/ray/thumbs/04-grid.webp",
      "/work/ray/thumbs/05-desktop.webp",
      "/work/ray/thumbs/06-pages.webp",
      "/work/ray/thumbs/07-screens.webp",
      "/work/ray/thumbs/08-widget.webp",
      "/work/ray/thumbs/09-chat.webp",
      "/work/ray/thumbs/10-logo.webp",
    ],
    href: "/work/ray",
  },
  {
    title: "Tomorrow's Spaces",
    image: "/work/tomorrow/00-cover.webp",
    hoverImages: [
      "/work/tomorrow/thumbs/02-web.webp",
      "/work/tomorrow/thumbs/03-store.webp",
      "/work/tomorrow/thumbs/04-mobile.webp",
      "/work/tomorrow/thumbs/05-product.webp",
      "/work/tomorrow/thumbs/06-collection.webp",
      "/work/tomorrow/thumbs/07-device.webp",
    ],
    href: "/work/tomorrow",
  },
  {
    title: "AISI",
    image: "/work/aisi/00-cover.webp",
    hoverImages: [
      "/work/aisi/thumbs/02-mobile.webp",
      "/work/aisi/thumbs/03-desktop.webp",
      "/work/aisi/thumbs/04-screens.webp",
      "/work/aisi/thumbs/05-selling.webp",
      "/work/aisi/thumbs/06-collection.webp",
    ],
    href: "/work/aisi",
  },
];
