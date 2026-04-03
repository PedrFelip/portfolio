import type { Heading } from "@/types/portfolio";

interface HeadingProps {
  children: React.ReactNode;
}

export function createHeadingComponents(headings: Heading[]) {
  let index = 0;

  const getNextId = (): string => {
    if (index < headings.length) {
      return headings[index++].id;
    }
    return `heading-${index++}`;
  };

  return {
    h1: ({ children }: HeadingProps) => {
      const id = getNextId();
      return (
        <h1
          id={id}
          className="text-2xl font-semibold tracking-[-0.02em] text-foreground mt-10 mb-4 first:mt-0 sm:text-3xl"
        >
          {children}
        </h1>
      );
    },
    h2: ({ children }: HeadingProps) => {
      const id = getNextId();
      return (
        <h2
          id={id}
          className="text-xl font-semibold tracking-[-0.02em] text-foreground mt-10 mb-3 scroll-mt-24 sm:text-2xl"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }: HeadingProps) => {
      const id = getNextId();
      return (
        <h3
          id={id}
          className="text-lg font-semibold tracking-[-0.02em] text-foreground mt-8 mb-2 scroll-mt-24 sm:text-xl"
        >
          {children}
        </h3>
      );
    },
  };
}
