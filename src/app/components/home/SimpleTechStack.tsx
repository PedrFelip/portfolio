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
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {subtitle}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>
      </div>

      {/* Grid with Dashed Internal Dividers */}
      <div className="rail-bounded border-t border-border">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className={`group px-6 py-10 sm:px-6 transition-all duration-300 hover:bg-white/[0.01] touch-manipulation
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
                <div
                  className="mb-4 inline-flex size-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/60 transition-all duration-300 group-hover:border-[var(--tech-color)]/30 group-hover:bg-[var(--tech-color)]/10 group-hover:text-[var(--tech-color)] group-hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:shadow-[var(--tech-color)]/20"
                  style={
                    {
                      borderColor: "rgba(255, 255, 255, 0.08)",
                    } as React.CSSProperties
                  }
                >
                  <Icon className="size-5" />
                </div>

                {/* Tech Name */}
                <h3 className="text-sm font-medium tracking-tight text-foreground transition-colors group-hover:text-white">
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
