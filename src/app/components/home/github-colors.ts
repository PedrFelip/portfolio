/** Contribution heatmap colors based on the site's blueprint blue accent. */
const contributionColorsDark: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "#171b1e",
  1: "#173b49",
  2: "#1d627a",
  3: "#278aa8",
  4: "#55b9d8",
};

const contributionColorsLight: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "#e7ecee",
  1: "#b9d9e2",
  2: "#83bfd0",
  3: "#4c9eb6",
  4: "#28738b",
};

export function getContributionColor(
  level: 0 | 1 | 2 | 3 | 4,
  theme: "dark" | "light" = "dark",
): string {
  return theme === "dark"
    ? contributionColorsDark[level]
    : contributionColorsLight[level];
}
