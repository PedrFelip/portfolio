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
          const index = String(i + 1).padStart(2, "0");
          const iconSegments = (itemConfig?.icons ?? []).map(
            (iconConfig, iconIndex) => ({
              iconConfig,
              key: `${item.id}-icon-${iconIndex}`,
              showPlus: iconIndex > 0,
              delay: iconIndex * 60,
            }),
          );
          return (
            <div
              key={item.id}
              className={`group relative px-4 py-8 sm:px-6 transition-colors duration-200 hover:bg-surface-2
                ${i % 3 !== 0 ? "lg:border-l lg:border-dashed lg:border-border" : ""}
                ${i % 2 !== 0 ? "sm:max-lg:border-l sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                ${i >= 2 ? "sm:max-lg:border-t sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                ${i >= 1 ? "max-sm:border-t max-sm:border-dashed max-sm:border-border" : ""}
              `}
            >
              {/* Index marker */}
              <span className="absolute right-4 top-4 font-mono text-[10px] tabular-nums text-muted-foreground/30 sm:right-6">
                {index}
              </span>

              {/* Icons */}
              <div className="mb-5 flex items-center gap-2.5">
                {iconSegments.map(({ iconConfig, key, showPlus, delay }) => (
                  <React.Fragment key={key}>
                    {showPlus && (
                      <span className="font-mono text-xs leading-none text-muted-foreground/30">
                        +
                      </span>
                    )}
                    <span
                      className="inline-flex"
                      style={
                        {
                          "--icon-color": iconConfig.color || "#ffffff",
                          transitionDelay: `${delay}ms`,
                        } as React.CSSProperties
                      }
                    >
                      <iconConfig.component className="size-5 text-[var(--icon-color)] transition-transform duration-300 group-hover:scale-110" />
                    </span>
                  </React.Fragment>
                ))}
              </div>

              {/* Text */}
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50 transition-colors duration-150 group-hover:text-muted-foreground/80">
                {item.title}
              </p>
              <h3 className="mt-2 text-[15px] font-semibold tracking-tight text-foreground/90 transition-colors duration-150 group-hover:text-foreground">
                {item.name}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground/70">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
