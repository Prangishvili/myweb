// Per-project accent colors for the page-transition curtain, sampled from each
// case study's own product screenshots and covers — so the curtain that plays
// while a project loads echoes that project's actual palette instead of always
// showing the same generic rainbow. Keyed by the last segment of the project's
// href (e.g. "/work/silk" -> "silk"). Projects without a distinct visual identity
// (the reel-style Motion Works / Inspiration pages) intentionally have no entry
// here and fall back to the default palette.
export const PROJECT_PALETTES: Record<string, string[]> = {
  silk: ["#0D0D0D", "#333333", "#595959", "#808080", "#A6A6A6", "#D9D9D9"],
  shuko: ["#FF5307", "#FFDF00", "#5A2114", "#CF9E75", "#B77B55"],
  ray: ["#78645A", "#503A30", "#C1C1C1", "#332E34", "#DADDDD"],
  tomorrow: ["#343435", "#D9D9D9", "#CECECE", "#E4E3E3", "#000000"],
  aisi: ["#212022", "#6F645F", "#AC9F99", "#000000", "#E5E5E4"],
  kao: ["#986842", "#774A2B", "#B8A08C", "#EEE9E3"],
};

/** Looks up a project's accent palette from a work-item href like "/work/silk". */
export function getProjectPalette(href?: string): string[] | undefined {
  if (!href) return undefined;
  const slug = href.split("/").filter(Boolean).pop();
  return slug ? PROJECT_PALETTES[slug] : undefined;
}
