import {
  Activity,
  Calendar,
  Cpu,
  Database,
  ExternalLink,
  GraduationCap,
  History,
  Layout,
  Mail,
  MapPin,
  Package,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import {
  AlignedFlickeringGrid,
  DotPattern,
  RailLayout,
  SectionDivider,
} from "@/components/blueprint";
import { CornerBrackets } from "@/components/blueprint/CornerBracket";
import { ContactLinks } from "@/components/about/ContactLinks";
import { Badge, Button, H3, MonoText, P } from "@/components/ui";
import { XIcon } from "@/components/ui/x-icon";
import {
  getContactLinks,
  getEducation,
  getWorkExperience,
} from "@/lib/about-data";
import { aboutEn } from "@/lib/content/about.en";
import { aboutPt } from "@/lib/content/about.pt";
import { parseBoldMarkdown } from "@/lib/markdown";
import { getSkills } from "@/lib/shared-data";

type Lang = "en" | "pt";

interface AboutPageProps {
  params: Promise<{ lang: Lang }>;
}

const aboutContent = {
  en: aboutEn,
  pt: aboutPt,
};

/**
 * AboutPage component - Blueprint Design
 *
 * This page follows the "Architectural Precision" design direction:
 * - RailLayout for structural grid alignment
 * - AlignedFlickeringGrid for decorative technical depth
 * - 3-column header grids for section headers
 * - Dashed borders for internal content separation
 * - Corner brackets for framing key information
 */
export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const t = aboutContent[lang] || aboutEn;

  // Parallel fetch for all about page data
  const [workExperience, education, contactLinks, skills] = await Promise.all([
    getWorkExperience(lang),
    getEducation(lang),
    getContactLinks(lang),
    getSkills(lang),
  ]);

  return (
    <RailLayout>
      {/* Hero / About Intro Section */}
      <section className="relative">
        <div className="rail-bounded overflow-hidden">
          <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
            {/* Column 1: Intro Info */}
            <div className="px-6 py-12 sm:px-8 sm:py-16">
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60 animate-in-left">
                {t.about.badge}
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl animate-in-left animate-delay-100">
                {t.about.title}
              </h1>
              <p className="mt-4 text-lg font-medium text-foreground/90 animate-in-left animate-delay-150">
                {t.about.intro}
              </p>
            </div>

            {/* Column 2: Detailed Description - Aligned with the center rail */}
            <div className="relative border-t border-dashed border-border px-6 py-12 sm:border-t-0 sm:border-l sm:px-8 sm:py-16 lg:px-10 animate-in-up animate-delay-200">
              <div className="relative z-10">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {parseBoldMarkdown(t.about.description)}
                </p>
              </div>
            </div>

            {/* Column 3: Decorative Flickering Grid */}
            <div className="relative border-t border-dashed border-border lg:border-t-0 lg:border-l overflow-hidden min-h-[200px] sm:min-h-0">
              <AlignedFlickeringGrid
                side="right"
                className="absolute inset-0 h-full w-full !flex"
              />
              <div className="absolute right-4 bottom-4 size-4 border-r border-b border-border/40" />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Work Experience Section */}
      <section id="experience" className="relative animate-in-up">
        <div className="rail-bounded overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Header Column */}
            <div className="px-6 py-12 sm:px-8 sm:py-16">
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
                {t.work.badge}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {t.work.title}
              </h2>
            </div>
            {/* Decorative Grid - Fills the rest of the header row */}
            <div className="relative border-t border-dashed border-border sm:border-t-0 sm:border-l sm:col-span-2 overflow-hidden min-h-[100px] sm:min-h-0">
              <AlignedFlickeringGrid
                side="right"
                className="absolute inset-0 h-full w-full !flex opacity-40"
                maxOpacity={0.1}
              />
              <div className="absolute left-6 top-1/2 -translate-y-1/2">
                <History className="size-12 text-white/5" />
              </div>
            </div>
          </div>
        </div>

        {/* Experience List - In a grid with dashed borders */}
        <div className="rail-bounded border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {workExperience.map((exp, i) => (
              <div
                key={`${exp.company}-${exp.title}`}
                className={`group px-6 py-10 sm:px-8 transition-all duration-300 hover:bg-white/[0.01] animate-in-up
                  ${i % 2 !== 0 ? "md:border-l md:border-dashed md:border-border" : ""}
                  ${i >= 2 ? "md:border-t md:border-dashed md:border-border" : ""}
                  ${i >= 1 ? "max-md:border-t max-md:border-dashed max-md:border-border" : ""}
                `}
                style={{ animationDelay: `${200 + i * 100}ms` }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between">
                    <div>
                      <MonoText className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-2 block">
                        {exp.start} — {exp.end || t.work.present}
                      </MonoText>
                      <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-white">
                        {exp.title}
                      </h3>
                    </div>
                    {exp.href && (
                      <Link
                        href={exp.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground/40 hover:text-white transition-colors"
                      >
                        <ExternalLink className="size-4" />
                      </Link>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-sm font-semibold text-foreground/80">
                      {exp.company}
                    </span>
                    <span className="text-muted-foreground/40">•</span>
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <MapPin className="size-3" />
                      {exp.location}
                    </div>
                  </div>

                  {exp.description && (
                    <p className="mt-6 text-sm leading-relaxed text-muted-foreground/90 group-hover:text-muted-foreground transition-colors">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Skills Section */}
      <section id="skills" className="relative animate-in-up">
        <div className="rail-bounded overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="px-6 py-12 sm:px-8 sm:py-16">
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
                {t.skills.badge}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {t.skills.title}
              </h2>
            </div>
            <div className="relative border-t border-dashed border-border sm:border-t-0 sm:border-l sm:col-span-2 overflow-hidden min-h-[100px] sm:min-h-0 bg-white/[0.01]">
              <DotPattern className="opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="flex flex-wrap justify-center gap-2 max-w-xl">
                  {skills
                    .flatMap((s) => s.items)
                    .slice(0, 15)
                    .map((skill) => (
                      <Badge
                        key={`decorative-skill-${skill}`}
                        variant="outline"
                        className="font-mono text-[10px] opacity-40 hover:opacity-100 transition-opacity pointer-events-none"
                      >
                        {skill}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rail-bounded border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((group, i) => (
              <div
                key={group.category}
                className={`group px-6 py-10 sm:px-6 transition-all duration-300 hover:bg-white/[0.01] animate-in-up
                  ${i % 4 !== 0 ? "lg:border-l lg:border-dashed lg:border-border" : ""}
                  ${i % 2 !== 0 ? "sm:max-lg:border-l sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                  ${i >= 4 ? "lg:border-t lg:border-dashed lg:border-border" : ""}
                  ${i >= 2 ? "sm:max-lg:border-t sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                  ${i >= 1 ? "max-sm:border-t max-sm:border-dashed max-sm:border-border" : ""}
                `}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-6">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="font-mono text-xs transition-colors duration-200 hover:border-white/40 hover:bg-white/[0.05] hover:text-white"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Education Section */}
      <section id="education" className="relative animate-in-up">
        <div className="rail-bounded overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="px-6 py-12 sm:px-8 sm:py-16">
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
                {t.education.badge}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {t.education.title}
              </h2>
            </div>
            <div className="relative border-t border-dashed border-border sm:border-t-0 sm:border-l sm:col-span-2 overflow-hidden min-h-[100px] sm:min-h-0">
              <div className="absolute right-8 top-1/2 -translate-y-1/2">
                <GraduationCap className="size-16 text-white/5" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/[0.02]" />
            </div>
          </div>
        </div>

        <div className="rail-bounded border-t border-border">
          <div className="grid grid-cols-1">
            {education.map((edu, i) => (
              <div
                key={`${edu.school}-${edu.degree}`}
                className={`group relative px-6 py-12 sm:px-8 transition-all duration-300 hover:bg-white/[0.01] animate-in-up
                    ${i > 0 ? "border-t border-dashed border-border" : ""}
                `}
              >
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-8">
                  <div className="flex flex-col justify-center">
                    <MonoText className="text-sm tabular-nums text-muted-foreground/60 mb-2">
                      {edu.start} — {edu.end}
                    </MonoText>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-white">
                      {edu.school}
                    </h3>
                  </div>
                  <div className="flex flex-col justify-center border-t border-dashed border-border pt-8 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-12">
                    <p className="text-lg font-medium text-foreground/90 group-hover:text-white transition-colors">
                      {edu.degree}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <Badge variant="education" className="w-fit">
                        Graduated
                      </Badge>
                      {edu.href && (
                        <Link
                          href={edu.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-white flex items-center gap-1 transition-colors"
                        >
                          <ExternalLink className="size-3" />
                          Institution Website
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Contact Section - CTA Style */}
      <section className="relative px-4 py-12 sm:px-6 sm:py-24 animate-in-up">
        <div className="rail-bounded">
          <div className="relative grid grid-cols-1 gap-0 sm:grid-cols-[0.7fr_minmax(0,_3.6fr)_0.7fr]">
            <AlignedFlickeringGrid side="left" />

            <div className="group relative border border-white/[0.08] bg-white/[0.02] px-6 py-12 sm:px-12 sm:py-16 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)] overflow-hidden">
              <DotPattern className="opacity-40 sm:opacity-20" />
              <CornerBrackets
                size={16}
                className="border-border/50 transition-all duration-300 group-hover:border-white/40 group-hover:scale-110"
              />

              <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl transition-colors duration-200 group-hover:text-white">
                  {t.contact.title}
                </h2>
                <p className="mt-4 max-w-md text-base text-muted-foreground sm:text-lg transition-colors duration-200 group-hover:text-muted-foreground/90">
                  {t.contact.description}
                </p>

                <div className="mt-12 w-full max-w-2xl">
                  <ContactLinks links={contactLinks} />
                </div>

                <div className="mt-12 flex w-full flex-col items-center gap-4 px-0 sm:w-auto sm:flex-row sm:px-4">
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-52 scale-on-active group/btn"
                  >
                    <Link href="mailto:pedrofelipeek@gmail.com">
                      <Mail className="mr-2 size-4" />
                      Email Me
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-52 scale-on-active"
                  >
                    <Link
                      href="https://x.com/pedrofelipeek"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <XIcon className="size-4" />
                      <span>Follow on X</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <AlignedFlickeringGrid side="right" />
          </div>
        </div>
      </section>
    </RailLayout>
  );
}
