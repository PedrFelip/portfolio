import {
  Activity,
  Cpu,
  Database,
  Package,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { SectionBadge, SectionLabel } from "@/components/blueprint";

interface FeatureItem {
  id: number;
  title: string;
  description: string;
}

interface HomeFeaturesSectionProps {
  badge: string;
  title: string;
  description: string;
  items: FeatureItem[];
}

const iconMap = {
  1: Cpu,
  2: ShieldCheck,
  3: Activity,
  4: Database,
  5: Package,
  6: Terminal,
};

export function HomeFeaturesSection({
  badge,
  title,
  description,
  items,
}: HomeFeaturesSectionProps) {
  return (
    <section
      id="features"
      data-slot="panel"
      className="bp-panel bp-line-bottom"
    >
      {/* Header */}
      <SectionBadge className="bp-line-bottom px-4 py-3 sm:px-6">
        <SectionLabel>{badge}</SectionLabel>
        <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-foreground/70">{description}</p>
      </SectionBadge>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const Icon = iconMap[item.id as keyof typeof iconMap] || Activity;
          return (
            <div
              key={item.id}
              className={`group px-4 py-6 sm:px-5 transition-all duration-200 hover:bg-surface-2
                ${i % 3 !== 0 ? "lg:border-l lg:border-dashed lg:border-border" : ""}
                ${i % 2 !== 0 ? "sm:max-lg:border-l sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                ${i >= 3 ? "lg:border-t lg:border-dashed lg:border-border" : ""}
                ${i >= 2 ? "sm:max-lg:border-t sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                ${i >= 1 ? "max-sm:border-t max-sm:border-dashed max-sm:border-border" : ""}
              `}
            >
              <div className="mb-3 inline-flex size-9 items-center justify-center rounded-lg border border-accent/15 bg-accent/[0.04] text-accent/60 transition-all duration-200 group-hover:text-accent group-hover:border-accent/30 group-hover:bg-accent/10">
                <Icon
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-200 group-hover:rotate-3"
                />
              </div>
              <h3 className="text-sm font-semibold tracking-tight transition-colors duration-150 group-hover:text-accent">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/60">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
