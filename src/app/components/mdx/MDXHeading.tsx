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
      return <h1 id={id}>{children}</h1>;
    },
    h2: ({ children }: HeadingProps) => {
      const id = getNextId();
      return <h2 id={id}>{children}</h2>;
    },
    h3: ({ children }: HeadingProps) => {
      const id = getNextId();
      return <h3 id={id}>{children}</h3>;
    },
  };
}
