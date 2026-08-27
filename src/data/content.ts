import { CDN_BASE } from "@/data/cdn";

export const site = {
  name: "Oto Prangi",
  bio: "Leading design where the discipline lines blur — AI, systems, brand, space.",
  links: [
    { label: "+995 593 26 11 77", href: "tel:+995593261177" },
    { label: "hello@otoprangi.com", href: "mailto:hello@otoprangi.com" },
    { label: "Instagram", href: "https://www.instagram.com/otoprangi/" },
  ],
};

export const cv: { heading: string; items: string[] }[] = [
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
  `${CDN_BASE}/work/showreel/earth-observation.mp4`,
  `${CDN_BASE}/work/showreel/teliani-valley.mp4`,
  `${CDN_BASE}/work/showreel/videoshops.mp4`,
  `${CDN_BASE}/work/showreel/ai-promo.mp4`,
  `${CDN_BASE}/work/showreel/concept-chat.mp4`,
  `${CDN_BASE}/work/showreel/Inspiration%20Creating.mp4`,
  `${CDN_BASE}/work/showreel/Inspiration%20Themes.mp4`,
  `${CDN_BASE}/work/showreel/maestro.mp4`,
  `${CDN_BASE}/work/showreel/fisa.mp4`,
  `${CDN_BASE}/work/showreel/screen-recording-1.mp4`,
  `${CDN_BASE}/work/showreel/screen-recording-2.mp4`,
  `${CDN_BASE}/work/showreel/tbilisi-contemporary-ballet.mp4`,
  `${CDN_BASE}/work/showreel/mural-fest-tbilisi.mp4`,
  `${CDN_BASE}/work/showreel/movement-tv.mp4`,
  `${CDN_BASE}/work/showreel/the-movement.mp4`,
  `${CDN_BASE}/work/showreel/national-geographic.mp4`,
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
    image: `${CDN_BASE}/work/silk/01-hero.webp`,
    hoverImages: [
      `${CDN_BASE}/work/silk/thumbs/02-Grid.webp`,
      `${CDN_BASE}/work/silk/thumbs/03-Chat.webp`,
      `${CDN_BASE}/work/silk/thumbs/04-Banner.webp`,
      `${CDN_BASE}/work/silk/thumbs/05-Tablet.webp`,
      `${CDN_BASE}/work/silk/thumbs/06-Mobile.webp`,
      `${CDN_BASE}/work/silk/thumbs/07-Marketplace.webp`,
      `${CDN_BASE}/work/silk/thumbs/08-Silk.webp`,
      `${CDN_BASE}/work/silk/thumbs/09-Widgets.webp`,
      `${CDN_BASE}/work/silk/thumbs/10-Silk%20Logo.webp`,
    ],
    href: "/work/silk",
  },
  {
    title: "Motion Works",
    video: `${CDN_BASE}/work/reel/cover.m4v`,
    poster: `${CDN_BASE}/work/reel/cover.webp`,
    href: "/work/motion-works",
  },
  {
    title: "Inspiration",
    video: `${CDN_BASE}/work/inspiration/cover.m4v`,
    poster: `${CDN_BASE}/work/inspiration/cover.webp`,
    href: "/work/inspiration",
  },
  {
    title: "Kao",
    video: `${CDN_BASE}/work/kao/cover.mp4`,
    poster: `${CDN_BASE}/work/kao/cover.webp`,
    href: "https://kao.furniture/",
  },
  {
    title: "Shuko",
    image: `${CDN_BASE}/work/shuko/00-cover.webp`,
    hoverImages: [
      `${CDN_BASE}/work/shuko/thumbs/02-team.webp`,
      `${CDN_BASE}/work/shuko/thumbs/03-spoon-closeup.webp`,
      `${CDN_BASE}/work/shuko/thumbs/04-social.webp`,
      `${CDN_BASE}/work/shuko/thumbs/05-cup.webp`,
      `${CDN_BASE}/work/shuko/thumbs/06-shuko.webp`,
      `${CDN_BASE}/work/shuko/thumbs/07-grid.webp`,
      `${CDN_BASE}/work/shuko/thumbs/08-truck.webp`,
      `${CDN_BASE}/work/shuko/thumbs/09-logo.webp`,
    ],
    href: "/work/shuko",
  },
  {
    title: "Ray",
    image: `${CDN_BASE}/work/ray/00-cover.webp`,
    hoverImages: [
      `${CDN_BASE}/work/ray/thumbs/02-mobile.webp`,
      `${CDN_BASE}/work/ray/thumbs/03-devices.webp`,
      `${CDN_BASE}/work/ray/thumbs/04-grid.webp`,
      `${CDN_BASE}/work/ray/thumbs/05-desktop.webp`,
      `${CDN_BASE}/work/ray/thumbs/06-pages.webp`,
      `${CDN_BASE}/work/ray/thumbs/07-screens.webp`,
      `${CDN_BASE}/work/ray/thumbs/08-widget.webp`,
      `${CDN_BASE}/work/ray/thumbs/09-chat.webp`,
      `${CDN_BASE}/work/ray/thumbs/10-logo.webp`,
    ],
    href: "/work/ray",
  },
  {
    title: "Tomorrow's Spaces",
    image: `${CDN_BASE}/work/tomorrow/00-cover.webp`,
    hoverImages: [
      `${CDN_BASE}/work/tomorrow/thumbs/02-web.webp`,
      `${CDN_BASE}/work/tomorrow/thumbs/03-store.webp`,
      `${CDN_BASE}/work/tomorrow/thumbs/04-mobile.webp`,
      `${CDN_BASE}/work/tomorrow/thumbs/05-product.webp`,
      `${CDN_BASE}/work/tomorrow/thumbs/06-collection.webp`,
      `${CDN_BASE}/work/tomorrow/thumbs/07-device.webp`,
    ],
    href: "/work/tomorrow",
  },
  {
    title: "AISI",
    image: `${CDN_BASE}/work/aisi/00-cover.webp`,
    hoverImages: [
      `${CDN_BASE}/work/aisi/thumbs/02-mobile.webp`,
      `${CDN_BASE}/work/aisi/thumbs/03-desktop.webp`,
      `${CDN_BASE}/work/aisi/thumbs/04-screens.webp`,
      `${CDN_BASE}/work/aisi/thumbs/05-selling.webp`,
      `${CDN_BASE}/work/aisi/thumbs/06-collection.webp`,
    ],
    href: "/work/aisi",
  },
];
