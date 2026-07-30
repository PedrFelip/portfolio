import Link from "next/link";
import { Aurora, NoiseOverlay, Reveal } from "@/components/blueprint";
import { Button } from "@/components/ui/button";
import { getSocialUrl } from "@/lib/links";

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
    <section className="my-6 sm:my-10">
      <div data-slot="cta" className="relative overflow-hidden rounded-[2rem]">
        <div aria-hidden className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-accent/55 to-background" />
          <Aurora />
          <NoiseOverlay />
          <div className="absolute inset-0 bg-background/30" />
        </div>

        <Reveal variant="up" className="relative z-10">
          <div className="flex flex-col items-center px-6 py-12 text-center sm:px-10 sm:py-16">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mt-3 max-w-md text-sm text-foreground/70 sm:text-base">
              {description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
              <Button
                asChild
                variant="primary"
                size="md"
                className="border-none px-4 sm:px-6"
              >
                <Link href={`/${lang}/projects`}>{primary}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="md"
                className="px-4 sm:px-6"
              >
                <Link
                  href={getSocialUrl("x")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${secondary} — opens in new tab`}
                  className="no-external-indicator"
                >
                  {secondary}
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
