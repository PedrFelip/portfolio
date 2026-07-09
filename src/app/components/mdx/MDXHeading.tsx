import type { HTMLAttributes, ReactNode } from "react";
import { isValidElement } from "react";
import { slugify } from "@/lib/slugify";

function nodeToString(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToString).join("");
  if (isValidElement(node)) {
    return nodeToString((node.props as { children?: ReactNode }).children);
  }
  return "";
}

export function createHeadingComponents() {
  // h2/h3 share a dedup map to match extractHeadings (H2/H3 only);
  // h1 is isolated so a body H1 never desyncs the TOC anchors.
  const primaryCounts = new Map<string, number>();
  const h1Counts = new Map<string, number>();

  const makeId = (counts: Map<string, number>, text: string): string => {
    const base = slugify(text);
    const count = counts.get(base) || 0;
    const id = count > 0 ? `${base}-${count}` : base;
    counts.set(base, count + 1);
    return id;
  };

  const create =
    (Tag: "h1" | "h2" | "h3") =>
    ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
      const counts = Tag === "h1" ? h1Counts : primaryCounts;
      return (
        <Tag {...props} id={makeId(counts, nodeToString(children))}>
          {children}
        </Tag>
      );
    };

  return {
    h1: create("h1"),
    h2: create("h2"),
    h3: create("h3"),
  };
}
