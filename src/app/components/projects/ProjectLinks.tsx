"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import { ExternalLink, Github } from "@/components/ui/icons";
import { useLanguage } from "@/lib/language-store";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/portfolio";

const LINK_OPTIONS = [
  { key: "github", label: "code", Icon: Github },
  { key: "demo", label: "demo", Icon: ExternalLink },
  { key: "website", label: "website", Icon: ExternalLink },
] as const;

interface ProjectLinksProps {
  links: NonNullable<Project["links"]>;
}

export function ProjectLinks({ links }: ProjectLinksProps) {
  const { t } = useLanguage();

  return (
    <div className="mt-4 flex flex-wrap gap-2 border-t border-dashed border-border/60 pt-4 sm:mt-5">
      {LINK_OPTIONS.map(({ key, label, Icon }) => {
        const href = links[key];
        if (!href) return null;

        return (
          <Button key={key} asChild variant="outline" size="sm">
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link text-xs sm:text-sm"
            >
              <Icon
                className={cn(
                  "mr-1.5 size-3 sm:mr-2 sm:size-3.5 group-hover/link:scale-110",
                  key === "github"
                    ? "icon-hover-rotate"
                    : "transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/link:translate-x-0.5",
                )}
                aria-hidden="true"
              />
              {t.projects.links[label]}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
