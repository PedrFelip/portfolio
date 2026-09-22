import { ArrowUpRight, Github, Linkedin, Mail } from "@/components/ui/icons";
import { XIcon } from "@/components/ui/x-icon";
import { cn } from "@/lib/utils";

export type ContactSocialLink = {
  label: string;
  url: string;
  icon: "github" | "linkedin" | "x" | "email";
};

interface SocialLinksGridProps {
  links: ContactSocialLink[];
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  x: XIcon,
  email: Mail,
};

export function SocialLinksGrid({ links }: SocialLinksGridProps) {
  return (
    <div className="max-w-screen overflow-x-clip">
      <div className="mx-auto px-4 md:max-w-4xl">
        <div className="relative border-x border-line">
          <div
            className="pointer-events-none absolute inset-0 -z-1 hidden gap-2 sm:grid sm:grid-cols-2"
            aria-hidden="true"
          >
            <div className="border-r border-line" />
            <div className="border-l border-line" />
          </div>

          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {links.map((link, index) => {
              const Icon = iconMap[link.icon];
              const isEmail = link.icon === "email";
              const href = isEmail ? `mailto:${link.url}` : link.url;
              const isLastMobileItem = index === links.length - 1;
              const lastDesktopRowStart =
                links.length - (links.length % 2 || 2);
              const isLastDesktopRowStart = index === lastDesktopRowStart;

              return (
                <li
                  key={link.label}
                  className={cn(
                    "max-sm:screen-line-top",
                    !isLastMobileItem && "max-sm:screen-line-bottom",
                    "sm:nth-[2n+1]:screen-line-top",
                    !isLastDesktopRowStart &&
                      "sm:nth-[2n+1]:screen-line-bottom",
                  )}
                >
                  <div className="relative flex cursor-pointer items-center gap-4 p-4 pr-2 transition-[background-color] duration-150 ease-out hover:bg-surface-2">
                    <Icon
                      className="size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <h3 className="flex-1 font-medium">
                      <a
                        href={href}
                        target={isEmail ? undefined : "_blank"}
                        rel={isEmail ? undefined : "noopener noreferrer"}
                        className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-inset"
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        {link.label}
                      </a>
                    </h3>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
