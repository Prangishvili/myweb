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
  "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/showreel/earth-observation.mp4",
  "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/showreel/teliani-valley.mp4",
  "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/showreel/videoshops.mp4",
  "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/showreel/ai-promo.mp4",
  "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/showreel/concept-chat.mp4",
  "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/showreel/Inspiration%20Creating.mp4",
  "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/showreel/Inspiration%20Themes.mp4",
  "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/showreel/maestro.mp4",
  "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/showreel/fisa.mp4",
  "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/showreel/screen-recording-1.mp4",
  "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/showreel/screen-recording-2.mp4",
  "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/showreel/tbilisi-contemporary-ballet.mp4",
  "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/showreel/mural-fest-tbilisi.mp4",
  "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/showreel/movement-tv.mp4",
  "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/showreel/the-movement.mp4",
  "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/showreel/national-geographic.mp4",
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
    image: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/01-hero.webp",
    hoverImages: [
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/thumbs/02-Grid.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/thumbs/03-Chat.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/thumbs/04-Banner.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/thumbs/05-Tablet.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/thumbs/06-Mobile.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/thumbs/07-Marketplace.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/thumbs/08-Silk.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/thumbs/09-Widgets.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/silk/thumbs/10-Silk%20Logo.webp",
    ],
    href: "/work/silk",
  },
  {
    title: "Motion Works",
    video: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/reel/cover.m4v",
    poster: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/reel/cover.webp",
    href: "/work/motion-works",
  },
  {
    title: "Inspiration",
    video: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/inspiration/cover.m4v",
    poster: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/inspiration/cover.webp",
    href: "/work/inspiration",
  },
  {
    title: "Kao",
    video: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/kao/cover.mp4",
    poster: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/kao/cover.webp",
  },
  {
    title: "Shuko",
    image: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/shuko/00-cover.webp",
    hoverImages: [
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/shuko/thumbs/02-team.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/shuko/thumbs/03-spoon-closeup.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/shuko/thumbs/04-social.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/shuko/thumbs/05-cup.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/shuko/thumbs/06-shuko.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/shuko/thumbs/07-grid.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/shuko/thumbs/08-truck.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/shuko/thumbs/09-logo.webp",
    ],
    href: "/work/shuko",
  },
  {
    title: "Ray",
    image: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/ray/00-cover.webp",
    hoverImages: [
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/ray/thumbs/02-mobile.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/ray/thumbs/03-devices.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/ray/thumbs/04-grid.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/ray/thumbs/05-desktop.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/ray/thumbs/06-pages.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/ray/thumbs/07-screens.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/ray/thumbs/08-widget.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/ray/thumbs/09-chat.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/ray/thumbs/10-logo.webp",
    ],
    href: "/work/ray",
  },
  {
    title: "Tomorrow's Spaces",
    image: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/tomorrow/00-cover.webp",
    hoverImages: [
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/tomorrow/thumbs/02-web.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/tomorrow/thumbs/03-store.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/tomorrow/thumbs/04-mobile.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/tomorrow/thumbs/05-product.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/tomorrow/thumbs/06-collection.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/tomorrow/thumbs/07-device.webp",
    ],
    href: "/work/tomorrow",
  },
  {
    title: "AISI",
    image: "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/aisi/00-cover.webp",
    hoverImages: [
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/aisi/thumbs/02-mobile.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/aisi/thumbs/03-desktop.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/aisi/thumbs/04-screens.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/aisi/thumbs/05-selling.webp",
      "https://xpm2mzg2i8lygpiz.public.blob.vercel-storage.com/work/aisi/thumbs/06-collection.webp",
    ],
    href: "/work/aisi",
  },
];
