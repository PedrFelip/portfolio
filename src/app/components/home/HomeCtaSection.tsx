import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowRight } from "@/components/ui/icons";
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
    <section>
      <div
        className="dot-pattern absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-20 text-center sm:py-28">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-md text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="w-44 group/btn">
            <Link href={`/${lang}/projects`}>
              {primary}
              <ArrowRight className="size-4 transition-transform duration-150 group-hover/btn:translate-x-0.5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-44">
            <Link
              href="https://x.com/pedrofelipeek"
              target="_blank"
              rel="noopener noreferrer"
            >
              <XIcon className="size-4" />
              <span>{secondary}</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
