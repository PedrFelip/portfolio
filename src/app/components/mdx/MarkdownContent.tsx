import "server-only";

import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { createCssVariablesTheme } from "shiki";
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

const CODE_TITLE_META_RE = /(?:^|\s)(?:title|file|name)="[^"]+"/g;

const BLUEPRINT_CODE_THEME = createCssVariablesTheme({
  name: "blueprint",
  variablePrefix: "--code-syntax-",
  fontStyle: false,
});

const PreComponent = ({
  children,
  "data-code-title": filename,
  "data-code-language": codeLanguage,
  "data-language": highlightedLanguage,
  ...preProps
}: React.HTMLAttributes<HTMLPreElement> & {
  "data-code-title"?: string;
  "data-code-language"?: string;
  "data-language"?: string;
}) => (
  <CodeBlockWrapper
    filename={filename}
    language={codeLanguage ?? highlightedLanguage}
    preProps={preProps}
  >
    {children}
  </CodeBlockWrapper>
);

const CodeComponent = ({
  children,
  className,
  "data-language": language,
  "data-theme": theme,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  "data-language"?: string;
  "data-theme"?: string;
}) => {
  if (language || theme) {
    return (
      <code
        className={className}
        data-language={language}
        data-theme={theme}
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <code
      className="rounded-sm bg-code-bg px-1.5 py-0.5 text-code-fg"
      {...props}
    >
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
            [
              rehypePrettyCode,
              {
                theme: BLUEPRINT_CODE_THEME,
                keepBackground: false,
                bypassInlineCode: true,
                // The existing wrapper renders filenames in its own header.
                // Remove title metadata here to avoid a second figcaption.
                filterMetaString: (meta: string) =>
                  meta.replace(CODE_TITLE_META_RE, "").trim(),
              },
            ],
          ],
        },
      }}
      components={{ ...MDX_COMPONENTS, ...headingComponents }}
    />
  );
}
