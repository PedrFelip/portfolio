import React from "react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/blueprint";
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
    <section id="toolkit" className="relative">
      <div className="rail-bounded">
        <div className="px-6 pb-8 pt-12 sm:px-8">
          <Reveal asChild variant="left" delay={0.02}>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {badge}
            </p>
          </Reveal>
          <Reveal asChild delay={0.05} variant="left">
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              {title}
            </h2>
          </Reveal>
          <Reveal asChild delay={0.08} variant="left">
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {description}
            </p>
          </Reveal>
        </div>
      </div>
      <div className="rail-bounded border-t border-border">
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const itemConfig = TOOLKIT_CONFIG[item.id];
            return (
              <StaggerItem
                key={item.id}
                className={`group px-6 py-10 sm:px-6 transition-all duration-200 hover:bg-surface-2 hover:shadow-inner
                  ${i !== 0 ? "lg:border-l lg:border-dashed lg:border-border" : ""}
                  ${i % 2 !== 0 ? "sm:max-lg:border-l sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                  ${i >= 2 ? "sm:max-lg:border-t sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                  ${i >= 1 ? "max-sm:border-t max-sm:border-dashed max-sm:border-border" : ""}
                `}
                variant="left"
              >
                <div className="flex flex-col">
                  <div className="mb-5 flex items-center gap-2">
                    {itemConfig?.icons.map((iconConfig, iconIndex) => (
                      <React.Fragment key={`${item.id}-icon-${iconIndex}`}>
                        {iconIndex > 0 && (
                          <span className="text-muted-foreground/40 font-mono text-sm leading-none flex items-center h-full">
                            +
                          </span>
                        )}
                        <div
                          className="inline-flex size-10 flex-shrink-0 items-center justify-center rounded-xl border border-overlay-border bg-surface-3 text-muted-foreground transition-all duration-300 group-hover:border-[var(--icon-color)]/30 group-hover:bg-[var(--icon-color)]/10 group-hover:text-[var(--icon-color)] group-hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:shadow-[var(--icon-color)]/20 group-hover:scale-110"
                          style={
                            {
                              "--icon-color": iconConfig.color || "#ffffff",
                              transitionDelay: `${iconIndex * 50}ms`,
                            } as React.CSSProperties
                          }
                        >
                          <iconConfig.component className="size-5 transition-transform duration-200 group-hover:rotate-6" />
                        </div>
                      </React.Fragment>
                    ))}
                  </div>

                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60 transition-colors duration-150 group-hover:text-muted-foreground">
                    {item.title}
                  </p>
                  <h3 className="mt-1 text-base font-semibold tracking-tight transition-colors duration-150 group-hover:text-foreground">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground/80 transition-colors duration-150 group-hover:text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
