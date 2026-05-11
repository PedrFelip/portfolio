import { memo } from "react";
import { CornerBrackets } from "@/components/blueprint/CornerBracket";
import { MonoText } from "@/components/ui";
import { Github, Linkedin, Mail } from "@/components/ui/icons";
import { XIcon } from "@/components/ui/x-icon";

interface ContactLink {
  label: string;
  url: string;
  icon: "github" | "linkedin" | "x" | "email";
}

interface BlueprintContactSectionProps {
  badge: string;
  title: string;
  description: string;
  links: ContactLink[];
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  x: XIcon,
  email: Mail,
};

const iconColors: Record<string, string> = {
  github:
    "hover:border-[oklch(0.72_0.12_290)_/_40%] hover:bg-[oklch(0.72_0.12_290)_/_8%] hover:text-[oklch(0.72_0.12_290)]",
  linkedin:
    "hover:border-[oklch(0.68_0.1_255)_/_40%] hover:bg-[oklch(0.68_0.1_255)_/_8%] hover:text-[oklch(0.68_0.1_255)]",
  x: "hover:border-[oklch(0.85_0.04_270)_/_40%] hover:bg-[oklch(0.85_0.04_270)_/_8%] hover:text-[oklch(0.85_0.04_270)]",
  email:
    "hover:border-[oklch(0.72_0.08_25)_/_40%] hover:bg-[oklch(0.72_0.08_25)_/_8%] hover:text-[oklch(0.72_0.08_25)]",
};

export const BlueprintContactSection = memo(function BlueprintContactSection({
  badge,
  title,
  description,
  links,
}: BlueprintContactSectionProps) {
  return (
    <section id="contact" className="relative">
      {/* Section Header */}
      <div className="rail-bounded">
        <div className="px-6 pb-8 pt-12 sm:px-8">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {badge}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      {/* Blueprint Contact Links Grid */}
      <div className="rail-bounded border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {links.map((link, i) => {
            const Icon = iconMap[link.icon];
            const isEmail = link.icon === "email";
            const href = isEmail ? `mailto:${link.url}` : link.url;

            return (
              <a
                key={link.label}
                href={href}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                className={`group relative flex items-center gap-3 px-6 py-5 transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-inset touch-manipulation ${iconColors[link.icon]}
                  ${i % 4 !== 0 ? "lg:border-l lg:border-dashed lg:border-border" : ""}
                  ${i % 2 !== 0 ? "max-lg:border-l max-lg:border-dashed max-lg:border-border" : ""}
                  ${i >= 4 ? "lg:border-t lg:border-dashed lg:border-border" : ""}
                  ${i >= 2 ? "max-lg:border-t max-lg:border-dashed max-lg:border-border" : ""}
                `}
              >
                {/* Blueprint coordinate marker */}
                <MonoText className="absolute right-2 top-2 text-[9px] text-border pointer-events-none">
                  {String.fromCharCode(65 + i)}1
                </MonoText>

                {/* Corner brackets on hover */}
                <CornerBrackets
                  size={8}
                  className="opacity-0 transition-opacity duration-200 group-hover:opacity-60"
                />

                <Icon
                  className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-inherit"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-foreground group-hover:text-inherit">
                    {link.label}
                  </span>
                  <MonoText className="block truncate text-[10px] text-muted-foreground/60">
                    {isEmail
                      ? link.url
                      : link.url.replace("https://", "").replace(/\/$/, "")}
                  </MonoText>
                </div>

                {/* Arrow indicator */}
                <svg
                  className="size-3.5 shrink-0 text-muted-foreground/30 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-inherit"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
});

BlueprintContactSection.displayName = "BlueprintContactSection";
