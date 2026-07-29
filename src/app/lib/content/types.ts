/**
 * Declared dictionary contract.
 *
 * Every `*.en.ts` / `*.pt.ts` module in this folder MUST `satisfies` its
 * section interface so en/pt drift is a compile error rather than silent
 * inference. `i18n.ts` re-exports the merged shape as `Translation`.
 */

interface NavSection {
  home: string;
  about: string;
  projects: string;
  blog: string;
  language: string;
  theme: string;
  toggleMenu: string;
}

interface CommonSection {
  home: string;
  about: string;
  projects: string;
  blog: string;
  language: string;
  github: string;
  website: string;
  present: string;
  viewProject: string;
  sourceCode: string;
}

interface FooterSection {
  year: number;
  madeWith: string;
  by: string;
  navigation: string;
  connect: string;
  builtWith: string;
}

interface HeaderSection {
  name: string;
  subtitle: string;
}

export interface SharedSection {
  nav: NavSection;
  common: CommonSection;
  footer: FooterSection;
  header: HeaderSection;
}

interface HeroSection {
  greeting: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaSecondary: string;
}

interface FeatureItem {
  id: number;
  title: string;
  description: string;
}

interface FeaturesSection {
  badge: string;
  title: string;
  description: string;
  items: FeatureItem[];
}

interface GitHubSection {
  badge: string;
  title: string;
  description: string;
  commitsLastYear: string;
  less: string;
  more: string;
  commit: string;
  commits: string;
  swipeHint: string;
  tapHint: string;
}

interface LatestPostSection {
  badge: string;
  title: string;
  description: string;
  readMore: string;
  readingTime: string;
  serial: string;
  empty: string;
}

interface TechStackSection {
  badge: string;
  title: string;
  description: string;
}

interface ToolkitItem {
  id: string;
  title: string;
  name: string;
  description: string;
}

interface ToolkitSection {
  badge: string;
  title: string;
  description: string;
  items: ToolkitItem[];
}

interface CtaSection {
  badge: string;
  title: string;
  description: string;
  primary: string;
  secondary: string;
}

export interface HomeSection {
  hero: HeroSection;
  features: FeaturesSection;
  github: GitHubSection;
  latestPost: LatestPostSection;
  techStack: TechStackSection;
  toolkit: ToolkitSection;
  cta: CtaSection;
}

interface AboutIntroSection {
  badge: string;
  title: string;
  intro: string;
  description: string;
  pageTitle: string;
}

interface WorkSection {
  badge: string;
  title: string;
  present: string;
}

interface EducationSection {
  badge: string;
  title: string;
}

interface ContactSection {
  badge: string;
  title: string;
  description: string;
}

interface SkillsSection {
  badge: string;
  title: string;
}

export interface AboutSection {
  about: AboutIntroSection;
  work: WorkSection;
  education: EducationSection;
  contact: ContactSection;
  skills: SkillsSection;
}

interface ProjectLinksSection {
  code: string;
  demo: string;
  website: string;
}

interface ProjectsFiltersSection {
  active: (count: number) => string;
  empty: string;
  clear: string;
  clearButton: string;
  noResults: string;
}

interface ProjectEntry {
  title: string;
  description: string;
}

export interface ProjectsSection {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  viewAll: string;
  links: ProjectLinksSection;
  filters: ProjectsFiltersSection;
  oportunne: ProjectEntry;
  saudePontual: ProjectEntry;
  planItCalendar: ProjectEntry;
  apiFinanceiro: ProjectEntry;
  notesApi: ProjectEntry;
  engineRoom: ProjectEntry;
  pageTitle: string;
}

export interface BlogSection {
  badge: string;
  title: string;
  subtitle: string;
  readMore: string;
  back: string;
  share: string;
  shareOn: string;
  copyLink: string;
  linkCopied: string;
  shareVia: string;
  noPosts: string;
  noPostsDesc: string;
  page: string;
  of: string;
  previous: string;
  next: string;
  allTags: string;
  onThisPage: string;
  readingTime: string;
  copyCode: string;
  codeCopied: string;
  failedToCopy: string;
  publishedCount: string;
  siteName: string;
  thanksForReading: string;
}

export interface LinksSection {
  heading: string;
  subtitle: string;
  footerText: string;
  availableForWork: string;
  portfolioDescription: string;
}

export interface NotFoundSection {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  errorCode: string;
  quickNav: string;
}

export interface MetaSection {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
}

/**
 * The merged dictionary shape — flat, because `i18n.ts` spreads every
 * section module into one object per locale. Section-keyed modules
 * (projects, blog, links, notFound, meta) contribute a single top-level
 * key; grouped modules (shared, home, about) contribute several.
 */
export interface Dictionary {
  // shared module
  nav: NavSection;
  common: CommonSection;
  footer: FooterSection;
  header: HeaderSection;
  // home module
  hero: HeroSection;
  features: FeaturesSection;
  github: GitHubSection;
  latestPost: LatestPostSection;
  techStack: TechStackSection;
  toolkit: ToolkitSection;
  cta: CtaSection;
  // about module
  about: AboutIntroSection;
  work: WorkSection;
  education: EducationSection;
  contact: ContactSection;
  skills: SkillsSection;
  // section-keyed modules
  projects: ProjectsSection;
  blog: BlogSection;
  links: LinksSection;
  notFound: NotFoundSection;
  meta: MetaSection;
}
