import { ViewTransition } from "react";

// Page-wide depth cue for navigation: the outgoing page fades out while
// scaling down slightly, the incoming page fades in scaling up to 100%.
// Wrapped per-page (not in the root layout) since layouts persist across
// navigations and never re-trigger enter/exit.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-fade-scale" exit="page-fade-scale" default="none">
      {children}
    </ViewTransition>
  );
}
