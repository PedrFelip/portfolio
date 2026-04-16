import Link from "next/link";
import {
  AlignedFlickeringGrid,
  BlueprintReveal,
  CornerBrackets,
  DotPattern,
  Reveal,
} from "@/components/blueprint";
import { Button } from "@/components/ui";
import { XIcon } from "@/components/ui/x-icon";

interface HomeCtaSectionProps {
  lang: string;
  title: string;
  description: string;
  primary: string;
  secondary: string;
}

export function HomeCtaSection({
  lang,
  title,
  description,
  primary,
  secondary,
}: HomeCtaSectionProps) {
  return (
    <section className="relative px-4 py-12 sm:px-6 sm:py-24">
      <div className="rail-bounded">
        <div className="relative grid grid-cols-1 gap-0 sm:grid-cols-[0.7fr_minmax(0,_3.6fr)_0.7fr]">
          <AlignedFlickeringGrid side="left" />

          <BlueprintReveal
            className="group relative border border-overlay-border bg-surface-2 px-4 py-12 sm:px-12 sm:py-16 transition-all duration-300 hover:border-overlay-border-hover hover:bg-surface-4 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)] overflow-hidden"
            dotPattern={<DotPattern className="opacity-40 sm:opacity-20" />}
            cornerBrackets={
              <CornerBrackets
                size={16}
                className="border-border/50 transition-all duration-300 group-hover:border-white/40 group-hover:scale-110"
              />
            }
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              <Reveal asChild variant="left" delay={0.03}>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl transition-colors duration-200 group-hover:text-foreground">
                  {title}
                </h2>
              </Reveal>
              <Reveal asChild delay={0.07} variant="up">
                <p className="mt-4 max-w-md text-base text-muted-foreground sm:text-lg transition-colors duration-200 group-hover:text-muted-foreground/90">
                  {description}
                </p>
              </Reveal>

              <Reveal asChild delay={0.12} variant="up">
                <div className="mt-8 flex w-full flex-col items-center gap-4 px-0 sm:mt-12 sm:w-auto sm:flex-row sm:px-4">
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-52 scale-on-active group/btn hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.15)] transition-all duration-200"
                  >
                    <Link href={`/${lang}/projects`}>
                      {primary}
                      <svg
                        className="size-4 transition-transform duration-150 group-hover/btn:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <title>Arrow right</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-52 scale-on-active hover:border-white/30 transition-all duration-200"
                  >
                    <Link
                      href="https://x.com/pedrofelipeek"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <XIcon className="size-4 transition-transform duration-150 group-hover:scale-110" />
                      <span>{secondary}</span>
                    </Link>
                  </Button>
                </div>
              </Reveal>
            </div>
          </BlueprintReveal>

          <AlignedFlickeringGrid side="right" />
        </div>
      </div>
    </section>
  );
}
