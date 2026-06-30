import { memo } from "react";
import { SectionBadge, SectionLabel } from "@/components/blueprint";
import { CornerBrackets } from "@/components/blueprint/CornerBracket";
import { MonoText } from "@/components/ui";
import { Github, Linkedin, Mail } from "@/components/ui/icons";
import { XIcon } from "@/components/ui/x-icon";

// TODO(refactor)[P1]: inline type duplicates SocialIcon from links.ts
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

// TODO(refactor)[P2]: social icon map duplicated
const iconMap = {
  github: Github,
  linkedin: Linkedin,
  x: XIcon,
  email: Mail,
};

// TODO(refactor)[P0]: hardcoded oklch colors mismatch CSS vars
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
    <section id="contact" data-slot="panel" className="bp-panel">
      {/* Header */}
      {/* TODO(refactor)[P2]: section header duplicated 8+ times */}
      <SectionBadge className="bp-line-bottom px-4 py-3 sm:px-6">
        <SectionLabel>{badge}</SectionLabel>
        <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </SectionBadge>

      {/* Contact Grid */}
      <div className="grid grid-cols-2">
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
              className={`group relative flex items-center gap-3 px-4 py-4 transition-all duration-150 hover:bg-surface-2 active:scale-[0.98] active:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-inset touch-manipulation ${iconColors[link.icon]}
                ${i % 2 !== 0 ? "border-l border-dashed border-border" : ""}
                ${i >= 2 ? "border-t border-dashed border-border" : ""}
              `}
            >
              {/* Blueprint coordinate marker */}
              <MonoText className="absolute right-2 top-2 text-[8px] text-border/60 pointer-events-none">
                {String.fromCharCode(65 + (i % 2))}
                {Math.floor(i / 2) + 1}
              </MonoText>

              {/* Corner brackets on hover */}
              <CornerBrackets
                size={8}
                className="opacity-0 transition-opacity duration-200 group-hover:opacity-50"
              />

              <Icon
                className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-inherit"
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-foreground group-hover:text-inherit">
                  {link.label}
                </span>
                <MonoText className="block truncate text-[10px] text-muted-foreground/50">
                  {isEmail
                    ? link.url
                    : link.url.replace("https://", "").replace(/\/$/, "")}
                </MonoText>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
});

BlueprintContactSection.displayName = "BlueprintContactSection";
