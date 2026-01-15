"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CodeBlockWrapperProps {
  children: React.ReactNode;
}

export function CodeBlockWrapper({ children }: CodeBlockWrapperProps) {
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
    <div className="relative group my-4">
      <pre
        className="bg-muted border border-border rounded-lg p-4 overflow-x-auto text-sm leading-relaxed hljs"
        data-code-block
      >
        {children}
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
    </div>
  );
}
