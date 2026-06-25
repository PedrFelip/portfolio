import type { Code, Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const TITLE_RE = /(?:^|\s)(?:title|file|name)="([^"]+)"/;

export interface CodeMetaResult {
  title: string | null;
  language: string | null;
}

export function parseCodeMeta(
  lang: string | null | undefined,
  meta: string | null | undefined,
): CodeMetaResult {
  const result: CodeMetaResult = {
    title: null,
    language: lang ?? null,
  };
  if (meta) {
    const match = meta.match(TITLE_RE);
    if (match?.[1]) result.title = match[1];
  }
  return result;
}

const remarkCodeMeta: Plugin<[], Root> = () => (tree) => {
  visit(tree, "code", (node: Code) => {
    const { title, language } = parseCodeMeta(node.lang, node.meta);
    if (!title) return;

    node.data = node.data ?? {};
    node.data.hProperties = node.data.hProperties ?? {};
    node.data.hProperties.dataCodeTitle = title;
    if (language) {
      node.data.hProperties.dataCodeLanguage = language;
    }
  });
};

export default remarkCodeMeta;
