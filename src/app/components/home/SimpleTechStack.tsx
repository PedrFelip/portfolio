import type { LucideIcon } from "lucide-react";
import {
  Cloud,
  Code,
  Database,
  GitBranch,
  Hexagon,
  Layers,
  Terminal,
} from "lucide-react";

interface TechItem {
  name: string;
  icon: LucideIcon;
}

const techData: TechItem[] = [
  { name: "Node.js", icon: Hexagon },
  { name: "TypeScript", icon: Terminal },
  { name: "Go", icon: Terminal },
  { name: "GraphQL", icon: GitBranch },
  { name: "PostgreSQL", icon: Database },
  { name: "MongoDB", icon: Database },
  { name: "Redis", icon: Database },
  { name: "Docker", icon: Layers },
  { name: "Kubernetes", icon: Cloud },
  { name: "AWS", icon: Cloud },
  { name: "Next.js", icon: Code },
  { name: "React", icon: Code },
];

export function SimpleTechStack() {
  return (
    <section id="tech-stack" className="relative">
      {/* Section Header */}
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="pb-6 pt-16">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Technologies
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Tech Stack
          </h2>
          <p className="mt-2 max-w-md text-base text-muted-foreground">
            Modern tools and technologies I work with daily.
          </p>
        </div>
      </div>

      {/* Grid with Dashed Internal Dividers */}
      <div className="rail-bounded border-t border-border">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {techData.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className={`group px-6 py-8 transition-colors hover:bg-white/[0.02]
                  ${i % 4 !== 0 ? "lg:border-l lg:border-dashed lg:border-border" : ""}
                  ${i % 3 !== 0 ? "sm:max-lg:border-l sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                  ${i % 2 !== 0 ? "max-sm:border-l max-sm:border-dashed max-sm:border-border" : ""}
                  ${i >= 4 ? "lg:border-t lg:border-dashed lg:border-border" : ""}
                  ${i >= 3 ? "sm:max-lg:border-t sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                  ${i >= 2 ? "max-sm:border-t max-sm:border-dashed max-sm:border-border" : ""}
                `}
              >
                {/* Icon Container */}
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/60 transition-colors group-hover:text-white/90">
                  <Icon size={18} strokeWidth={1.5} />
                </div>

                {/* Tech Name */}
                <h3 className="text-sm font-medium tracking-tight text-foreground">
                  {tech.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
