import type { Element, ElementContent, Root } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

// Matches https://(twitter.com|x.com)/<user>/status/<id> and
// the "/i/web/status/<id>" canonical form. Query strings are ignored.
const TWEET_URL_RE =
  /^https?:\/\/(?:www\.)?(?:twitter|x)\.com\/(?:[^/]+\/status|i\/web\/status)\/(\d+)/i;

const extractTweetId = (href: string): string | null => {
  const match = href.match(TWEET_URL_RE);
  return match ? match[1] : null;
};

const rehypeTweet: Plugin<[], Root> = () => (tree) => {
  visit(tree, "element", (node, index, parent) => {
    if (node.tagName !== "p" || !parent || typeof index !== "number") return;

    // auto-embed: the paragraph must contain exactly one non-whitespace
    // child. Inline tweet URLs stay as normal links/text.
    const meaningful = node.children.filter((child) => {
      if (child.type === "text") return child.value.trim().length > 0;
      return true;
    });
    if (meaningful.length !== 1) return;

    const child = meaningful[0];

    // case 1: a bare URL typed as plain text (no autolink plugin active)
    let id: string | null = null;
    if (child.type === "text") {
      id = extractTweetId(child.value.trim());
    } else if (child.type === "element" && child.tagName === "a") {
      // case 2: a markdown link [text](url) or an autolinked <url>
      const href = child.properties?.href;
      if (typeof href === "string") id = extractTweetId(href);
    }

    if (!id) return;

    const tweetNode: Element = {
      type: "element",
      tagName: "Tweet",
      properties: { id },
      children: [],
    };

    (parent.children as ElementContent[])[index] = tweetNode;
  });
};

export default rehypeTweet;
