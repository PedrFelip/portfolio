import { Reveal, StaggerGroup, StaggerItem } from "@/components/common";
import { DEFAULT_TECH_STACK, type TechItem } from "@/lib/tech-stack";

interface SimpleTechStackProps {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  items?: TechItem[];
}

export function SimpleTechStack({
  id = "tech-stack",
  title = "Tech Stack",
  subtitle = "Technologies",
  description = "Modern tools and technologies I work with daily.",
  items = DEFAULT_TECH_STACK,
}: SimpleTechStackProps) {
  return (
    <section id={id} className="relative">
      {/* Section Header */}
      <div className="rail-bounded">
        <div className="px-6 pb-6 pt-12 sm:px-8 sm:pt-16">
          <Reveal
            as="p"
            className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
          >
            {subtitle}
          </Reveal>
          <Reveal
            as="h2"
            delay={0.06}
            className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {title}
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base"
          >
            {description}
          </Reveal>
        </div>
      </div>

      {/* Grid with Dashed Internal Dividers */}
      <div className="rail-bounded border-t border-border">
        <StaggerGroup
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          speed="fast"
        >
          {items.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <StaggerItem
                key={tech.name}
                className={`group px-6 py-10 sm:px-6 transition-all duration-300 hover:bg-surface-1 touch-manipulation
                  ${i % 4 !== 0 ? "lg:border-l lg:border-dashed lg:border-border" : ""}
                  ${i % 3 !== 0 ? "sm:max-lg:border-l sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                  ${i % 2 !== 0 ? "max-sm:border-l max-sm:border-dashed max-sm:border-border" : ""}
                  ${i >= 4 ? "lg:border-t lg:border-dashed lg:border-border" : ""}
                  ${i >= 3 ? "sm:max-lg:border-t sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                  ${i >= 2 ? "max-sm:border-t max-sm:border-dashed max-sm:border-border" : ""}
                `}
                style={
                  {
                    "--tech-color": tech.color,
                  } as React.CSSProperties
                }
              >
                {/* Icon Container */}
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl border border-overlay-border bg-surface-3 text-muted-foreground transition-all duration-300 group-hover:border-[var(--tech-color)]/30 group-hover:bg-[var(--tech-color)]/10 group-hover:text-[var(--tech-color)] group-hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:shadow-[var(--tech-color)]/20">
                  <Icon className="size-5" />
                </div>

                {/* Tech Name */}
                <h3 className="text-sm font-medium tracking-tight text-foreground transition-colors group-hover:text-accent">
                  {tech.name}
                </h3>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
