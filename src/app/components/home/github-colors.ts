/**
 * Get contribution color based on level using GitHub's contribution palette.
 */
const contributionColorsDark: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "#161b22",
  1: "#0e4429",
  2: "#006d32",
  3: "#26a641",
  4: "#39d353",
};

const contributionColorsLight: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "#ebedf0",
  1: "#9be9a8",
  2: "#40c463",
  3: "#30a14e",
  4: "#216e39",
};

export function getContributionColor(
  level: 0 | 1 | 2 | 3 | 4,
  theme: "dark" | "light" = "dark",
): string {
  return theme === "dark"
    ? contributionColorsDark[level]
    : contributionColorsLight[level];
}
