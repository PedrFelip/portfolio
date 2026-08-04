/**
 * JSON-LD structured data builders.
 *
 * @see https://schema.org
 * @see https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
 */

import { siteConfig } from "./site";

type JsonLd = Record<string, unknown>;

export function personSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": ["Person", "ProfilePage"],
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.jobTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/favicon.svg`,
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.x,
    ],
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.defaultLocale,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/pt/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

interface BlogPostingInput {
  title: string;
  description: string;
  slug: string;
  date: string;
  modifiedDate: string;
  tags: string[];
  wordCount?: number;
  readingTime?: number;
}

export function blogPostingSchema(post: BlogPostingInput): JsonLd {
  const url = `${siteConfig.url}/pt/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.modifiedDate || post.date,
    inLanguage: "pt-BR",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    keywords: post.tags.join(", "),
    wordCount: post.wordCount,
    timeRequired: post.readingTime ? `PT${post.readingTime}M` : undefined,
    image: `${siteConfig.url}/favicon.svg`,
  };
}

interface BreadcrumbInput {
  slug: string;
  title: string;
}

export function blogBreadcrumbSchema(item: BreadcrumbInput): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteConfig.url}/pt`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteConfig.url}/pt/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: item.title,
        item: `${siteConfig.url}/pt/blog/${item.slug}`,
      },
    ],
  };
}

interface JsonLdScriptProps {
  data: JsonLd | JsonLd[];
}

/** Render a JSON-LD <script> tag. */
export function JsonLdScript({ data }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: serializing static structured data, no user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
