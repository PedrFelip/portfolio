import "server-only";

import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import { Callout } from "@/components/mdx/Callout";
import { CodeBlockWrapper } from "@/components/mdx/CodeBlockWrapper";
import { Figure } from "@/components/mdx/Figure";
import { createHeadingComponents } from "@/components/mdx/MDXHeading";
import {
  MDXTable,
  MDXTableBody,
  MDXTableCell,
  MDXTableHead,
  MDXTableRow,
} from "@/components/mdx/MDXTable";
import { Tweet } from "@/components/mdx/Tweet";
import rehypeCodeMeta from "@/lib/mdx/rehype-code-meta";
import rehypeTweet from "@/lib/mdx/rehype-tweet";
import remarkCodeMeta from "@/lib/mdx/remark-code-meta";

const PreComponent = ({
  children,
  "data-code-title": filename,
  "data-code-language": language,
}: React.HTMLAttributes<HTMLPreElement> & {
  "data-code-title"?: string;
  "data-code-language"?: string;
}) => (
  <CodeBlockWrapper filename={filename} language={language}>
    {children}
  </CodeBlockWrapper>
);

const CodeComponent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  if (className?.startsWith("hljs")) {
    return <code className={className}>{children}</code>;
  }
  return (
    <code className="bg-code-bg text-code-fg px-1.5 py-0.5 rounded-sm">
      {children}
    </code>
  );
};

const TableCellHeader = ({ children }: { children: React.ReactNode }) => (
  <MDXTableCell isHeader>{children}</MDXTableCell>
);

const TableCell = ({ children }: { children: React.ReactNode }) => (
  <MDXTableCell>{children}</MDXTableCell>
);

const isExternalLink = (href: string) =>
  /^https?:\/\//i.test(href) ||
  href.startsWith("mailto:") ||
  href.startsWith("tel:");

const MDXLink = ({
  href = "",
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  if (isExternalLink(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};

const MDX_COMPONENTS = {
  a: MDXLink,
  pre: PreComponent,
  code: CodeComponent,
  Callout,
  Figure,
  Tweet,
  table: MDXTable,
  thead: MDXTableHead,
  tbody: MDXTableBody,
  tr: MDXTableRow,
  th: TableCellHeader,
  td: TableCell,
};

interface MarkdownContentProps {
  source: string;
}

export function MarkdownContent({ source }: MarkdownContentProps) {
  // Heading counters must be isolated for each article render.
  const headingComponents = createHeadingComponents();

  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkCodeMeta],
          rehypePlugins: [
            rehypeCodeMeta,
            rehypeTweet,
            [rehypeHighlight, { detect: true }],
          ],
        },
      }}
      components={{ ...MDX_COMPONENTS, ...headingComponents }}
    />
  );
}
