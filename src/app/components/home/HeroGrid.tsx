import type { JSX } from "react";

import { siGo, siNestjs, siNodedotjs } from "simple-icons";
import { Button } from "@/components/ui";
import { createIcon } from "@/lib/create-icon";
import { cn } from "@/lib/utils";

/* ─── Tech icons via simple-icons ─── */

const nodejs = createIcon(siNodedotjs);
const nestjs = createIcon(siNestjs);
const go = createIcon(siGo);

/* ─── Hero Component ─── */

interface HeroGridProps {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaSecondary: string;
  ctaHref: string;
  ctaSecondaryHref: string;
}

export function HeroGrid({
  title,
  subtitle,
  description,
  cta,
  ctaSecondary,
  ctaHref,
  ctaSecondaryHref,
}: HeroGridProps) {
  return (
    <div className="relative w-full overflow-x-clip overflow-y-visible">
      <div className="mx-auto md:max-w-4xl px-4">
        {/* Mobile / Tablet layout */}
        {/* TODO(refactor)[P2]: mobile and desktop SVG blocks 90% duplicated */}
        <div className="bp-line-top bp-panel lg:hidden">
          <svg
            className="pointer-events-none absolute inset-0 overflow-visible text-border"
            viewBox="0 0 210 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <g className="text-border">
              <path
                className="bp-draw-dashed"
                style={{ animationDelay: "0ms, 0ms" }}
                d="M380.853 105.099L-201.625 464.632"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
              />
              <path
                className="bp-draw-dashed"
                style={{ animationDelay: "200ms, 200ms" }}
                d="M-165.247 -267.831L369.777 600.141"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            <g>
              <path
                className="bp-draw-line"
                style={{ animationDelay: "400ms, 400ms" }}
                d="M209.5 260L130 260"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
              />
              <path
                className="bp-draw-line"
                style={{ animationDelay: "500ms, 500ms" }}
                d="M129.5 339.5L129.5 210"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
              />
              <path
                className="bp-draw-line"
                style={{ animationDelay: "600ms, 600ms" }}
                d="M159.5 260L159.5 210"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
              />
              <path
                className="bp-draw-line"
                style={{ animationDelay: "700ms, 700ms" }}
                d="M3.09944e-06 210L209.5 210"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
              />
              <path
                className="bp-draw-line"
                style={{ animationDelay: "800ms, 800ms" }}
                d="M160 240L130.133 240"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
              />
              <path
                className="bp-draw-line"
                style={{ animationDelay: "900ms, 900ms" }}
                d="M149.5 240L149.5 260"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            <g>
              <rect
                className="bp-draw-rect"
                style={{ animationDelay: "1000ms, 1000ms" }}
                x="159.5"
                y="210"
                width="30"
                height="30"
                transform="rotate(90 159.5 210)"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
              />
              <rect
                className="bp-draw-rect"
                style={{ animationDelay: "1200ms, 1200ms" }}
                x="149.5"
                y="240"
                width="20"
                height="20"
                transform="rotate(90 149.5 240)"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
              />
              <rect
                className="bp-draw-rect"
                style={{ animationDelay: "1400ms, 1400ms" }}
                x="159.5"
                y="240"
                width="20"
                height="10"
                transform="rotate(90 159.5 240)"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            <path
              className="bp-draw-spiral text-muted-foreground/30"
              style={{ animationDelay: "1600ms, 1600ms" }}
              d="M149.643 239.897C155.106 239.897 159.619 244.414 159.619 249.882C159.619 255.35 155.106 259.868 149.643 259.868C138.717 259.868 129.69 250.833 129.69 239.897C129.69 223.493 143.23 209.941 159.619 209.941C186.935 209.941 209.5 232.527 209.5 259.868C209.5 303.613 173.396 339.75 129.69 339.75C58.6695 339.75 -1.22732e-05 281.027 -9.16589e-06 209.941C-4.14648e-06 95.1103 94.7738 0.24998 209.5 0.249985C395.69 0.250001 549.5 154.06 549.5 340.25"
              stroke="currentColor"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="relative grid aspect-[1/1.618] grid-cols-[1.618fr_minmax(0,1fr)] grid-rows-[1.618fr_1fr]">
            <MainContent
              className="col-[1/span_2] row-1"
              title={title}
              subtitle={subtitle}
              description={description}
              cta={cta}
              ctaSecondary={ctaSecondary}
              ctaHref={ctaHref}
              ctaSecondaryHref={ctaSecondaryHref}
            />

            <div className="col-2 row-2" />

            <div className="col-1 row-2 flex flex-col items-center justify-center overflow-hidden p-2 sm:p-4" />
          </div>
        </div>

        {/* Desktop layout */}
        <div className="bp-line-top bp-panel hidden lg:block">
          <svg
            className="pointer-events-none absolute inset-0 overflow-visible text-border"
            viewBox="0 0 340 210"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <g className="text-border">
              <path
                className="bp-draw-dashed"
                style={{ animationDelay: "0ms, 0ms" }}
                d="M105.1 -170.853L464.633 411.625"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
              />
              <path
                className="bp-draw-dashed"
                style={{ animationDelay: "200ms, 200ms" }}
                d="M-267.831 375.247L600.141 -159.777"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            <g>
              <path
                className="bp-draw-line"
                style={{ animationDelay: "400ms, 400ms" }}
                d="M260 0.5V80"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
              />
              <path
                className="bp-draw-line"
                style={{ animationDelay: "500ms, 500ms" }}
                d="M339.5 80.5H210"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
              />
              <path
                className="bp-draw-line"
                style={{ animationDelay: "600ms, 600ms" }}
                d="M210 210V0.5"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            <g>
              <rect
                className="bp-draw-rect"
                style={{ animationDelay: "800ms, 800ms" }}
                x="210"
                y="50.5"
                width="30"
                height="30"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
              />
              <rect
                className="bp-draw-rect"
                style={{ animationDelay: "1000ms, 1000ms" }}
                x="240"
                y="60.5"
                width="20"
                height="20"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
              />
              <rect
                className="bp-draw-rect"
                style={{ animationDelay: "1200ms, 1200ms" }}
                x="240"
                y="50.5"
                width="20"
                height="10"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            <path
              className="bp-draw-spiral text-muted-foreground/30"
              style={{ animationDelay: "1400ms, 1400ms" }}
              d="M239.897 60.3571C239.897 54.894 244.414 50.381 249.882 50.381C255.35 50.381 259.868 54.894 259.868 60.3571C259.868 71.2835 250.833 80.3095 239.897 80.3095C223.493 80.3095 209.941 66.7704 209.941 50.381C209.941 23.0652 232.527 0.499999 259.868 0.5C303.613 0.499995 339.75 36.6043 339.75 80.3095C339.75 151.33 281.027 210 209.941 210C95.1103 210 0.25 115.226 0.25 0.5C0.250008 -185.69 154.06 -339.5 340.25 -339.5"
              stroke="currentColor"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="relative grid aspect-[1.618/1] grid-cols-[1.618fr_minmax(0,1fr)] grid-rows-[1fr_1.618fr]">
            <MainContent
              className="col-1 row-[1/span_2]"
              title={title}
              subtitle={subtitle}
              description={description}
              cta={cta}
              ctaSecondary={ctaSecondary}
              ctaHref={ctaHref}
              ctaSecondaryHref={ctaSecondaryHref}
            />

            <div className="col-2 row-1" />

            <div className="col-2 row-2 flex items-center justify-center overflow-hidden p-4 lg:p-8" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Content ─── */
// TODO(refactor)[P2]: MainContent takes 8 props forwarded

interface MainContentProps {
  className?: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaSecondary: string;
  ctaHref: string;
  ctaSecondaryHref: string;
}

function MainContent({
  className,
  title,
  subtitle,
  description,
  cta,
  ctaSecondary,
  ctaHref,
  ctaSecondaryHref,
}: MainContentProps) {
  // TODO(refactor)[P1]: .icon access reassigned every render
  const NodeIcon = nodejs.icon;
  const NestIcon = nestjs.icon;
  const GoIcon = go.icon;

  return (
    <div
      className={cn(
        "flex flex-col justify-center overflow-hidden p-4 sm:p-6 lg:p-8",
        className,
      )}
    >
      <h1 className="mb-3 text-3xl leading-none font-semibold tracking-tight bg-gradient-to-b from-foreground via-foreground to-accent bg-clip-text text-transparent sm:mb-4 sm:text-4xl md:text-5xl lg:text-5xl">
        <span className="block">{title}</span>
        <span className="block">{subtitle}</span>
      </h1>

      <p className="mb-5 text-sm leading-normal text-foreground/70 sm:mb-6 sm:text-base md:text-lg">
        {description}
      </p>

      <div className="mb-5 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:gap-3">
        <Button
          asChild
          variant="primary"
          size="md"
          className="border-none px-4 sm:px-6"
        >
          <a href={ctaHref}>{cta}</a>
        </Button>

        <Button asChild variant="outline" size="md" className="px-4 sm:px-6">
          <a href={ctaSecondaryHref}>{ctaSecondary}</a>
        </Button>
      </div>

      <div className="relative -ml-4 lg:ml-0">
        <div className="absolute -top-2 right-0 z-10 block h-10 w-20 bg-background mask-[linear-gradient(to_left,white,transparent)] lg:hidden" />

        <div className="no-scrollbar flex items-center gap-3 overflow-x-auto px-4 lg:px-0">
          <TechItem icon={<NodeIcon />} title="Node.js" color="#339933" />
          <TechItem icon={<NestIcon />} title="NestJS" color="#E0234E" />
          <TechItem icon={<GoIcon />} title="Go" color="#00ADD8" />
        </div>
      </div>
    </div>
  );
}

/* ─── Tech Item ─── */

function TechItem({
  icon,
  title,
  color,
}: {
  icon: JSX.Element;
  title: string;
  color: string;
}) {
  return (
    <div
      className="group flex items-center space-x-1.5 text-muted-foreground hover:text-[var(--tech-color)] select-none transition-colors duration-150 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5 [&_svg]:transition-colors [&_svg]:duration-150"
      style={{ "--tech-color": color } as React.CSSProperties}
    >
      {icon}
      <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
        {title}
      </span>
    </div>
  );
}
