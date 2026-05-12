import Link from "next/link";
import { MonoText } from "@/components/ui";
import { ArrowRight } from "@/components/ui/icons";

interface HomeCtaSectionProps {
  lang: string;
  title: string;
  description: string;
  primary: string;
  secondary: string;
}

/**
 * HomeCtaSection — chanhdai.com inspired CTA panel
 *
 * Panel with header line, two links with animated arrows,
 * status pill. No bottom line (last panel).
 */
export function HomeCtaSection({
  lang,
  title,
  description,
  primary,
  secondary,
}: HomeCtaSectionProps) {
  return (
    <section data-slot="panel" className="bp-panel">
      <div className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-sm">
            <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>

            {/* Links */}
            <div className="mt-8">
              <Link
                href={`/${lang}/projects`}
                className="
                  group flex items-center justify-between
                  py-3 border-b border-border/20
                  hover:border-border/50
                  transition-colors duration-150
                "
              >
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground group-hover:text-foreground transition-colors duration-150">
                  {primary}
                </span>
                <ArrowRight className="size-3.5 text-muted-foreground/30 opacity-70 group-hover:translate-x-1.5 group-hover:opacity-100 group-hover:text-foreground transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]" />
              </Link>

              <Link
                href="https://x.com/pedrofelipeek"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex items-center justify-between
                  py-3 border-b border-border/20
                  hover:border-border/50
                  transition-colors duration-150
                "
              >
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground group-hover:text-foreground transition-colors duration-150">
                  {secondary}
                </span>
                <ArrowRight className="size-3.5 text-muted-foreground/30 opacity-70 group-hover:translate-x-1.5 group-hover:opacity-100 group-hover:text-foreground transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
