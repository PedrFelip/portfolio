"use client";

import { Check, Copy } from "lucide-react";
import { memo, useState } from "react";

interface CodeBlockWrapperProps {
  children: React.ReactNode;
}

/**
 * CodeBlockWrapper component for MDX code blocks
 *
 * Design principles (AGENTS.md):
 * - 4px grid spacing (p-1.5 = 6px, p-4 = 16px)
 * - Borders-only approach (no shadows)
 * - Animation: 150-200ms with cubic-bezier easing
 * - Isolated controls: copy button feels like crafted object
 * - Monospace for code content
 *
 * Best practices applied:
 * - Memoized to prevent re-renders
 * - Accessible copy button with visual feedback
 * - Respects reduced motion preference
 * - Clean group hover interaction
 */
export const CodeBlockWrapper = memo(({ children }: CodeBlockWrapperProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      // Verificar se clipboard API está disponível
      if (!navigator?.clipboard) {
        console.error("Clipboard API not available");
        return;
      }

      // Extrair texto puro do HTML do highlight.js
      const preElement = document.querySelector("[data-code-block]");
      if (!preElement) return;

      // Obter apenas o texto sem tags HTML
      const text = preElement.textContent || "";
      await navigator.clipboard.writeText(text);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="group relative my-4">
      <pre
        className="hljs overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm leading-relaxed"
        data-code-block
      >
        {children}
      </pre>

      {/* Copy button */}
      <button
        type="button"
        onClick={copyToClipboard}
        className="absolute right-3 top-3 rounded border border-border bg-card p-1.5 text-muted-foreground opacity-0 transition-[opacity,color] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground group-hover:opacity-100 motion-reduce:transition-none"
        title="Copy code"
        aria-label={copied ? "Code copied" : "Copy code"}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
});

CodeBlockWrapper.displayName = "CodeBlockWrapper";
