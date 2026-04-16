import {
  Activity,
  Cpu,
  Database,
  Package,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/blueprint";

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
    <section id="features" className="relative">
      <div className="rail-bounded">
        <div className="px-6 pb-8 pt-12 sm:px-8">
          <Reveal asChild variant="left" delay={0.02}>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {badge}
            </p>
          </Reveal>
          <Reveal asChild variant="left" delay={0.05}>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              {title}
            </h2>
          </Reveal>
          <Reveal asChild variant="left" delay={0.08}>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {description}
            </p>
          </Reveal>
        </div>
      </div>
      <div className="rail-bounded border-t border-border">
        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = iconMap[item.id as keyof typeof iconMap] || Activity;
            return (
              <StaggerItem
                key={item.id}
                className={`group px-6 py-8 sm:px-6 transition-all duration-200 hover:bg-surface-2 hover:shadow-inner
                  ${i % 3 !== 0 ? "lg:border-l lg:border-dashed lg:border-border" : ""}
                  ${i % 2 !== 0 ? "sm:max-lg:border-l sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                  ${i >= 3 ? "lg:border-t lg:border-dashed lg:border-border" : ""}
                  ${i >= 2 ? "sm:max-lg:border-t sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                  ${i >= 1 ? "max-sm:border-t max-sm:border-dashed max-sm:border-border" : ""}
                `}
                variant="left"
              >
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl border border-overlay-border bg-surface-3 text-muted-foreground transition-all duration-200 group-hover:text-foreground group-hover:border-overlay-border-hover group-hover:bg-faint group-hover:scale-110">
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    className="transition-transform duration-200 group-hover:rotate-3"
                  />
                </div>
                <h3 className="text-base font-semibold tracking-tight transition-colors duration-150 group-hover:text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition-colors duration-150 group-hover:text-muted-foreground/90">
                  {item.description}
                </p>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
