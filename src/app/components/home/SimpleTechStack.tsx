import { SectionBadge, SectionLabel } from "@/components/blueprint";
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
    <section id={id} data-slot="panel" className="bp-panel bp-line-bottom">
      {/* Header */}
      {/* TODO(refactor)[P2]: section header duplicated 8+ times */}
      <SectionBadge className="bp-line-bottom px-4 py-3 sm:px-6">
        <SectionLabel>{subtitle}</SectionLabel>
        <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </SectionBadge>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((tech, i) => {
          const Icon = tech.icon;
          return (
            <div
              key={tech.name}
              // TODO(refactor)[P2]: grid border logic duplicated
              className={`group px-4 py-8 sm:px-5 transition-all duration-300 hover:bg-surface-2 touch-manipulation
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
                className="tech-icon-box mb-3 inline-flex size-9 items-center justify-center rounded-lg border border-overlay-border bg-surface-3 text-muted-foreground transition-all duration-300"
                style={{ "--tech-color": tech.color } as React.CSSProperties}
              >
                <Icon className="size-4" />
              </div>

              {/* Tech Name */}
              <h3 className="text-sm font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-[var(--tech-color)]">
                {tech.name}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}
