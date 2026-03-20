import {
  Cloud,
  Database,
  Layers,
  Package,
  Plug,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import {
  AlignedFlickeringGrid,
  DotPattern,
  RailLayout,
  SectionDivider,
} from "@/components/blueprint";
import { CornerBrackets } from "@/components/blueprint/CornerBracket";
import { GitHubSection } from "@/components/home/GitHubSection";
import { SimpleTechStack } from "@/components/home/SimpleTechStack";
import { Button } from "@/components/ui";
import { XIcon } from "@/components/ui/x-icon";

interface NewPageProps {
  params: Promise<{ lang: string }>;
}

const features = [
  {
    id: 1,
    title: "Scalable APIs",
    description:
      "RESTful and GraphQL APIs designed for performance and maintainability",
    icon: Plug,
  },
  {
    id: 2,
    title: "Cloud Infrastructure",
    description:
      "AWS, GCP, and Azure deployments with IaC using Terraform and Pulumi",
    icon: Cloud,
  },
  {
    id: 3,
    title: "Containerization",
    description:
      "Docker and Kubernetes orchestration for reliable microservices",
    icon: Package,
  },
  {
    id: 4,
    title: "Database Design",
    description:
      "SQL and NoSQL schema design, optimization, and migration strategies",
    icon: Database,
  },
  {
    id: 5,
    title: "CI/CD Pipelines",
    description: "Automated testing, deployment, and monitoring workflows",
    icon: RefreshCw,
  },
  {
    id: 6,
    title: "System Architecture",
    description:
      "Designing resilient, distributed systems with fault tolerance",
    icon: Layers,
  },
];

export default async function NewPage({ params }: NewPageProps) {
  const { lang } = await params;

  return (
    <RailLayout>
      {/* Hero Section */}
      <section className="relative">
        <div className="rail-bounded">
          <div className="relative grid grid-cols-1 gap-0 sm:grid-cols-[0.6fr_minmax(0,_3.8fr)_0.6fr]">
            {/* Left flickering grid - subtle entry */}
            <AlignedFlickeringGrid
              side="left"
              className="border-b border-white/[0.08]"
            />

            {/* Central Hero Content */}
            <div className="relative flex flex-col items-center border-b border-x border-white/[0.08] bg-white/[0.01] px-6 pb-20 pt-12 text-center sm:px-12 overflow-hidden">
              <DotPattern className="opacity-30" />
              <CornerBrackets
                size={16}
                className="border-white/10 transition-colors duration-500 group-hover:border-white/20"
              />

              {/* Main headline - Enhanced Typography */}
              <h1 className="relative z-10 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl leading-[1.1]">
                <span className="inline-block bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent animate-fade-in">
                  Backend Engineer
                </span>
                <br />
                <span className="inline-block text-muted-foreground/90 relative">
                  & DevOps Enthusiast
                  <div className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-emerald-500/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-full" />
                </span>
              </h1>

              {/* Subtitle - More evocative */}
              <p className="relative z-10 mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Building scalable, maintainable systems focused on efficiency
                and reliability. Architecting the future, one service at a time.
              </p>

              {/* CTAs - Refined with subtle border glow */}
              <div className="relative z-10 mt-12 flex flex-col items-center gap-4 px-6 sm:flex-row">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href={`/${lang}/projects`} className="group">
                    Explore my work
                    <svg
                      className="size-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>Arrow right</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Link href={`/${lang}/about`}>Read my CV</Link>
                </Button>
              </div>
            </div>

            {/* Right flickering grid - subtle entry */}
            <AlignedFlickeringGrid
              side="right"
              className="border-b border-white/[0.08]"
            />
          </div>
        </div>
      </section>
      <SimpleTechStack />
      <SectionDivider />
      {/* Features Grid Section */}
      <section id="features" className="relative">
        <div className="relative mx-auto w-full max-w-6xl px-6">
          <div className="pt-12 pb-8">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Capabilities
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              What I bring to the table
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Core competencies in backend development, infrastructure, and
              system design.
            </p>
          </div>
        </div>
        <div className="rail-bounded border-t border-border">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`group px-6 py-6 transition-colors hover:bg-white/[0.02]
                    ${i % 3 !== 0 ? "lg:border-l lg:border-dashed lg:border-border" : ""}
                    ${i % 2 !== 0 ? "sm:max-lg:border-l sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                    ${i >= 3 ? "lg:border-t lg:border-dashed lg:border-border" : ""}
                    ${i >= 2 ? "sm:max-lg:border-t sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                    ${i >= 1 ? "max-sm:border-t max-sm:border-dashed max-sm:border-border" : ""}
                  `}
                >
                  <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/60 transition-colors group-hover:text-white/90">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <SectionDivider />
      <GitHubSection />
      <SectionDivider />

      {/* CTA Section */}
      <section className="relative px-6 py-16 sm:py-24">
        <div className="rail-bounded">
          {/* Grid container aligned with blueprint rails */}
          <div className="relative grid grid-cols-1 gap-0 sm:grid-cols-[0.7fr_minmax(0,_3.6fr)_0.7fr]">
            {/* Left flickering grid - aligned to rail */}
            <AlignedFlickeringGrid side="left" />

            {/* CTA Card Container with Corner Brackets */}
            <div className="group relative border border-white/[0.08] bg-white/[0.02] px-8 py-12 sm:px-12 sm:py-16">
              <CornerBrackets
                size={16}
                className="border-border/50 transition-colors duration-300 group-hover:border-white/20"
              />

              {/* Content */}
              <div className="flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Let's build something together
                </h2>
                <p className="mt-4 max-w-md text-base text-muted-foreground sm:text-lg">
                  I'm always open to discussing new projects, creative ideas, or
                  opportunities.
                </p>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                  <Button asChild className="w-44">
                    <Link href={`/${lang}/projects`}>View Projects</Link>
                  </Button>

                  <Button asChild variant="outline" className="w-44">
                    <Link
                      href="https://x.com/pedrofelipeek"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <XIcon className="size-4" />
                      <span>Follow on Twitter</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right flickering grid - aligned to rail */}
            <AlignedFlickeringGrid side="right" />
          </div>
        </div>
      </section>
    </RailLayout>
  );
}
