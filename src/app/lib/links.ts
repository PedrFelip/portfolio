// TODO(refactor)[P1]: SocialIcon and SocialLink not exported
type SocialIcon = "portfolio" | "github" | "linkedin" | "x" | "email";

interface SocialLink {
  label: string;
  url: string;
  handle: string;
  icon: SocialIcon;
}

export const socialLinks: SocialLink[] = [
  {
    label: "Portfolio",
    url: "/",
    handle: "",
    icon: "portfolio",
  },
  {
    label: "GitHub",
    // TODO(refactor)[P1]: GitHub username hardcoded
    url: "https://github.com/pedrfelip",
    handle: "@pedrfelip",
    icon: "github",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/pedrfelip/",
    handle: "/in/pedrfelip",
    icon: "linkedin",
  },
  {
    label: "X",
    url: "https://x.com/pdrdotdev",
    handle: "@pdrdotdev",
    icon: "x",
  },
  {
    label: "Email",
    url: "mailto:pfsilva190406@gmail.com",
    handle: "pfsilva190406@gmail.com",
    icon: "email",
  },
];

function getSocialLink(icon: SocialIcon): SocialLink | undefined {
  return socialLinks.find((link) => link.icon === icon);
}

export function getSocialUrl(icon: SocialIcon): string {
  return getSocialLink(icon)?.url ?? "";
}

export function getSocialHandle(icon: SocialIcon): string {
  return getSocialLink(icon)?.handle ?? "";
}
