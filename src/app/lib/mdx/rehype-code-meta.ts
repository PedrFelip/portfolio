import type { Element, Root } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const rehypeCodeMeta: Plugin<[], Root> = () => (tree) => {
  visit(tree, "element", (node: Element) => {
    if (node.tagName !== "pre") return;

    const codeChild = node.children.find(
      (child): child is Element =>
        child.type === "element" && child.tagName === "code",
    );
    if (!codeChild) return;

    const codeProps = codeChild.properties as
      | Record<string, unknown>
      | undefined;
    if (!codeProps) return;

    const title = codeProps.dataCodeTitle;
    const language = codeProps.dataCodeLanguage;
    if (typeof title !== "string" && typeof language !== "string") return;

    node.properties = node.properties ?? {};
    if (typeof title === "string") {
      node.properties.dataCodeTitle = title;
      delete codeProps.dataCodeTitle;
    }
    if (typeof language === "string") {
      node.properties.dataCodeLanguage = language;
      delete codeProps.dataCodeLanguage;
    }
  });
};

export default rehypeCodeMeta;
