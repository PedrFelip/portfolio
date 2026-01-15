"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      // Extract text content from children
      let text = "";
      if (typeof children === "string") {
        text = children;
      } else if (
        children &&
        typeof children === "object" &&
        "props" in children &&
        children.props &&
        typeof children.props === "object" &&
        "children" in children.props &&
        typeof children.props.children === "string"
      ) {
        text = children.props.children;
      }
      if (text) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Extract language from className (e.g., "language-javascript")
  const language = className?.replace("language-", "") || "text";

  return (
    <div className="relative group my-4">
      <pre
        className={cn(
          "bg-muted border border-border rounded-lg p-4 overflow-x-auto text-sm leading-relaxed hljs",
          className,
        )}
      >
        <code>{children}</code>
      </pre>

      {/* Copy button */}
      <button
        type="button"
        onClick={copyToClipboard}
        className="absolute top-3 right-3 p-1.5 rounded border border-border bg-card text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-foreground"
        title="Copy code"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>

      {/* Language label */}
      {language !== "text" && (
        <div className="absolute top-3 left-3 text-xs text-muted-foreground font-mono uppercase tracking-wider">
          {language}
        </div>
      )}
    </div>
  );
}
