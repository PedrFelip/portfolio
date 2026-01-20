export interface SocialLink {
  label: string;
  url: string;
  icon: "portfolio" | "github" | "linkedin" | "x" | "email";
}

export const socialLinks: SocialLink[] = [
  {
    label: "Portfolio",
    url: "/",
    icon: "portfolio",
  },
  {
    label: "GitHub",
    url: "https://github.com/pedrfelip",
    icon: "github",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/pedrfelip/",
    icon: "linkedin",
  },
  {
    label: "X",
    url: "https://x.com/pedrofelipeek",
    icon: "x",
  },
  {
    label: "Email",
    url: "mailto:pfsvila190406@gmail.com",
    icon: "email",
  },
];
