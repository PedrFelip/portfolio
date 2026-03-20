import {
  Cloud,
  Database,
  Layers,
  Package,
  Plug,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { RailLayout, SectionDivider } from "@/components/blueprint";
import { CornerBrackets } from "@/components/blueprint/CornerBracket";
import { GitHubSection } from "@/components/home/GitHubSection";
import { SimpleTechStack } from "@/components/home/SimpleTechStack";
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
      <section className="relative flex flex-col items-center px-4 pb-0 pt-20 text-center sm:pt-28">
        {/* Dashed guide lines visible on larger screens */}

        <div
          className="pointer-events-none absolute inset-0 z-0 mx-auto hidden w-full max-w-5xl px-4 sm:block"
          aria-hidden="true"
        >
          <div className="absolute left-4 top-0 bottom-0 w-px border-l border-dashed border-border" />
          <div className="absolute right-4 top-0 bottom-0 w-px border-r border-dashed border-border" />
        </div>

        {/* Status badge */}
        <div className="relative z-10 mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5">
          <span className="size-1.5 rounded-full bg-white/40 animate-pulse" />
          <span className="text-[13px] text-white/60">Available for work</span>
        </div>

        {/* Main headline */}
        <h1 className="relative z-10 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Backend Engineer
          <br />
          <span className="text-muted-foreground">& DevOps Enthusiast</span>
        </h1>

        {/* Subtitle */}
        <p className="relative z-10 mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
          Building scalable, maintainable systems focused on efficiency and
          reliability
        </p>

        {/* CTAs */}
        <div className="relative z-10 mt-8 mb-16 flex flex-col items-center gap-3 px-6 sm:flex-row">
          <Link
            href={`/${lang}/projects`}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            Explore my work
          </Link>
          <Link
            href={`/${lang}/about`}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/[0.1] px-5 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.04]"
          >
            Read my CV
          </Link>
        </div>
      </section>
      <SectionDivider />
      {/* Tech Stack Section */}
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
        {/* Grid with dashed dividers */}
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
      {/* GitHub Activity Section */}
      <GitHubSection />
      <SectionDivider />

      {/* CTA Section */}
      <section className="relative px-6 py-16 sm:py-24">
        <div className="relative mx-auto max-w-6xl">
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
                <div className="relative">
                  <Link
                    href={`/${lang}/projects`}
                    className="relative inline-flex h-11 w-44 items-center justify-center gap-2 rounded-lg bg-foreground text-sm font-medium text-background transition-all duration-150 hover:opacity-90"
                  >
                    View Projects
                  </Link>
                </div>

                <div className="relative">
                  <Link
                    href="https://x.com/pedrofelipeek"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex h-11 w-44 items-center justify-center gap-2 rounded-lg border border-white/[0.1] text-sm font-medium text-foreground transition-all duration-150 hover:bg-white/[0.04]"
                  >
                    <XIcon className="size-4" />
                    <span>Follow on Twitter</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RailLayout>
  );
}
