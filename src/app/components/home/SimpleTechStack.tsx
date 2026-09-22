import { Fragment } from "react";
import { SectionBadge } from "@/components/blueprint";
import { DEFAULT_TECH_STACK, type TechItem } from "@/lib/tech-stack";
import { cn } from "@/lib/utils";

interface SimpleTechStackProps {
  id?: string;
  title?: string;
  description?: string;
  items?: TechItem[];
}

export function SimpleTechStack({
  id = "tech-stack",
  title = "Tech Stack",
  description = "Modern tools and technologies I work with daily.",
  items = DEFAULT_TECH_STACK,
}: SimpleTechStackProps) {
  return (
    <section id={id} data-slot="panel" className="bp-panel bp-line-bottom">
      {/* Header */}
      {/* TODO(refactor)[P2]: section header duplicated 8+ times */}
      <SectionBadge line="bottom" className="px-4 py-3 sm:px-6">
        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </SectionBadge>

      {/* Grid */}
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0 z-10 grid grid-cols-[minmax(0,1fr)_0.5rem_minmax(0,1fr)] sm:grid-cols-[minmax(0,1fr)_0.5rem_minmax(0,1fr)_0.5rem_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_0.5rem_minmax(0,1fr)_0.5rem_minmax(0,1fr)_0.5rem_minmax(0,1fr)]"
          aria-hidden="true"
        >
          <div className="col-start-2 h-full border-x border-line" />
          <div className="col-start-4 hidden h-full border-x border-line sm:block" />
          <div className="col-start-6 hidden h-full border-x border-line lg:block" />
        </div>

        <div className="relative grid grid-cols-2 gap-x-2 gap-y-0 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <Fragment key={tech.name}>
                <div
                  className="group flex flex-col items-center px-4 py-8 text-center transition-all duration-300 hover:bg-surface-2 touch-manipulation"
                  style={
                    {
                      "--tech-color": tech.color,
                    } as React.CSSProperties
                  }
                >
                  {/* Icon Container */}
                  <div
                    className="tech-icon-box mb-3 inline-flex size-9 items-center justify-center rounded-lg border border-overlay-border bg-surface-3 text-muted-foreground transition-all duration-300"
                    style={
                      {
                        "--tech-color": tech.color,
                      } as React.CSSProperties
                    }
                  >
                    <Icon className="size-4" />
                  </div>

                  {/* Tech Name */}
                  <h3 className="text-sm font-medium tracking-tight text-foreground transition-colors duration-300 group-hover:text-[var(--tech-color)]">
                    {tech.name}
                  </h3>
                </div>
                {i < items.length - 1 && (
                  <div
                    aria-hidden="true"
                    className={cn(
                      "col-span-full screen-line-top screen-line-bottom h-2",
                      i % 2 === 0 ? "hidden" : "block",
                      i % 3 === 2 ? "sm:block" : "sm:hidden",
                      i % 4 === 3 ? "lg:block" : "lg:hidden",
                    )}
                  />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
