/**
 * Shared UI strings used across multiple pages (English)
 * Navigation, Footer, Common buttons and labels
 */

export const sharedEn = {
  nav: {
    home: "Home",
    about: "About / CV",
    projects: "Projects",
    blog: "Blog",
    language: "Language",
    theme: "Theme",
    toggleMenu: "Toggle menu",
  },

  // TODO(refactor)[P1]: common block not consumed anywhere
  common: {
    home: "Home",
    about: "About",
    projects: "Projects",
    blog: "Blog",
    language: "Language",
    github: "GitHub",
    website: "Website",
    present: "Present",
    viewProject: "View Project",
    sourceCode: "Source Code",
  },

  footer: {
    year: new Date().getFullYear(),
    madeWith: "Made with",
    by: "by",
    navigation: "Navigation",
    connect: "Connect",
    builtWith: "Built with Next.js, Tailwind CSS 4 & Bun",
  },

  // TODO(refactor)[P1]: header block not consumed
  header: {
    name: "Pedro Felipe",
    subtitle: "Backend Engineer & System Architect",
  },
};
