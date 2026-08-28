import { CDN_BASE } from "@/data/cdn";

export type WorkProcessDoc = {
  slug: string;
  title: string;
  description: string;
  file: string;
  files?: { label: string; file: string }[];
};

export const workProcessDocs: WorkProcessDoc[] = [
  {
    slug: "information-architecture",
    title: "Information Architecture VS",
    description: "Work process document by Oto Prangi.",
    file: `${CDN_BASE}/work-process/information-architecture.pdf`,
  },
  {
    slug: "maestro",
    title: "Maestro",
    description: "Work process document by Oto Prangi.",
    file: `${CDN_BASE}/work-process/maestro.pdf`,
  },
  {
    slug: "silk-prototype",
    title: "Silk Prototype",
    description: "Work process document by Oto Prangi.",
    file: `${CDN_BASE}/work-process/silk-prototype.pdf`,
  },
  {
    slug: "design-process",
    title: "Design Process",
    description: "Work process document by Oto Prangi.",
    file: `${CDN_BASE}/work-process/design-process.pdf`,
  },
  {
    slug: "design-system",
    title: "Design System",
    description: "Work process document by Oto Prangi.",
    file: `${CDN_BASE}/work-process/design-system.pdf`,
  },
  {
    slug: "testing-and-feedback",
    title: "Testing & Feedback",
    description: "Work process document by Oto Prangi.",
    file: `${CDN_BASE}/work-process/testing-and-feedback.pdf`,
  },
  {
    slug: "vs-zeplin-integration-and-retrospect",
    title: "VS Zeplin Integration & Retrospect",
    description: "Work process document by Oto Prangi.",
    file: `${CDN_BASE}/work-process/vs-zeplin-integration-and-retrospect.pdf`,
  },
  {
    slug: "videoshops-app-guidelines-and-research",
    title: "Videoshops App Guidelines and Research",
    description: "Work process document by Oto Prangi.",
    file: `${CDN_BASE}/work-process/videoshops-app-guidelines-and-research.pdf`,
    files: [
      { label: "Guidelines & Research", file: `${CDN_BASE}/work-process/videoshops-app-guidelines-and-research.pdf` },
      { label: "Visual Direction for App PT1", file: `${CDN_BASE}/work-process/visual-direction-for-app-pt1.pdf` },
    ],
  },
];
