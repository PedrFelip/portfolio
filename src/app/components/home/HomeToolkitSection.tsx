import React from "react";
import { SectionBadge, SectionLabel } from "@/components/blueprint";
import { TOOLKIT_CONFIG } from "@/lib/toolkit-data";

interface ToolkitItem {
  id: string;
  title: string;
  name: string;
  description: string;
}

interface HomeToolkitSectionProps {
  badge: string;
  title: string;
  description: string;
  items: ToolkitItem[];
}

export function HomeToolkitSection({
  badge,
  title,
  description,
  items,
}: HomeToolkitSectionProps) {
  return (
    <section id="toolkit" data-slot="panel" className="bp-panel bp-line-bottom">
      {/* Header */}
      {/* TODO(refactor)[P2]: section header duplicated 8+ times */}
      <SectionBadge className="bp-line-bottom px-4 py-3 sm:px-6">
        <SectionLabel>{badge}</SectionLabel>
        <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </SectionBadge>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const itemConfig = TOOLKIT_CONFIG[item.id];
          return (
            <div
              key={item.id}
              // TODO(refactor)[P2]: grid border logic duplicated
              className={`group px-4 py-8 sm:px-5 transition-all duration-200 hover:bg-surface-2
                ${i % 3 !== 0 ? "lg:border-l lg:border-dashed lg:border-border" : ""}
                ${i % 2 !== 0 ? "sm:max-lg:border-l sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                ${i >= 2 ? "sm:max-lg:border-t sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                ${i >= 1 ? "max-sm:border-t max-sm:border-dashed max-sm:border-border" : ""}
              `}
            >
              <div className="flex flex-col">
                <div className="mb-4 flex items-center gap-2">
                  {itemConfig?.icons.map((iconConfig, iconIndex) => (
                    <React.Fragment key={`${item.id}-icon-${iconIndex}`}>
                      {iconIndex > 0 && (
                        <span className="text-muted-foreground/40 font-mono text-sm leading-none flex items-center h-full">
                          +
                        </span>
                      )}
                      <div
                        className="inline-flex size-9 flex-shrink-0 items-center justify-center rounded-lg border border-overlay-border bg-surface-3 text-muted-foreground transition-all duration-300 group-hover:border-[var(--icon-color)]/30 group-hover:bg-[var(--icon-color)]/10 group-hover:text-[var(--icon-color)]"
                        style={
                          {
                            "--icon-color": iconConfig.color || "#ffffff",
                            // TODO(refactor)[P1]: "#ffffff" fallback
                            transitionDelay: `${iconIndex * 50}ms`,
                          } as React.CSSProperties
                        }
                      >
                        <iconConfig.component className="size-4 transition-transform duration-200 group-hover:rotate-6" />
                      </div>
                    </React.Fragment>
                  ))}
                </div>

                <p className="text-[10px] font-medium tracking-wider text-muted-foreground/60 transition-colors duration-150 group-hover:text-muted-foreground">
                  {item.title}
                </p>
                <h3 className="mt-1 text-sm font-semibold tracking-tight transition-colors duration-150 group-hover:text-foreground">
                  {item.name}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground/80">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
