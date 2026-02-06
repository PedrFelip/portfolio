import { memo } from "react";

interface CodeBlockTechStackProps {
  techStack: readonly string[];
}

/**
 * CodeBlockTechStack component
 *
 * Displays tech stack in code editor format with line numbers:
 * 1 import {
 * 2   Node.js,
 * 3   TypeScript,
 * 4   NestJS,
 * 5   PostgreSQL,
 * 6   Docker,
 * 7   Linux
 * 8 } from '@pedrofelipe/stack';
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing and line-height
 * - Monospace for code elements
 * - IDE-like selection hover effects
 * - Color for meaning only (syntax highlighting)
 * - 150-250ms animations
 *
 * Best practices applied:
 * - Memoized to prevent re-renders
 * - Tabular numbers for line numbers alignment
 * - User-select disabled for line numbers
 * - Staggered reveal animation per line
 */
export const CodeBlockTechStack = memo(
  ({ techStack }: CodeBlockTechStackProps) => {
    const totalLines = techStack.length + 2;

    return (
      <div className="code-block animate-in-left animate-delay-500">
        <div className="rounded-lg border border-border bg-muted/40 p-4 sm:p-6">
          <div className="flex leading-[1.6]">
            {/* Line Numbers Column */}
            <div className="mr-4 select-none tabular-nums hidden sm:block">
              {Array.from({ length: totalLines }, (_, i) => {
                const lineNumber = i + 1;
                return (
                  <div
                    key={`line-number-${lineNumber}`}
                    className="line-number text-xs sm:text-sm"
                  >
                    {lineNumber}
                  </div>
                );
              })}
            </div>

            {/* Code Content */}
            <div className="flex-1">
              {/* Import statement line */}
              <div
                className="code-line text-xs sm:text-sm"
                style={{ animationDelay: "500ms" }}
              >
                <span className="text-muted-foreground">import</span>
                <span className="syntax-punctuation"> {`{`}</span>
              </div>

              {/* Tech stack items */}
              {techStack.map((tech, index) => (
                <div
                  key={`tech-${tech}`}
                  className="code-line text-xs sm:text-sm"
                  style={{
                    animationDelay: `${550 + index * 50}ms`,
                  }}
                >
                  <span className="ml-4 syntax-string">{tech},</span>
                </div>
              ))}

              {/* Closing brace with from statement */}
              <div
                className="code-line text-xs sm:text-sm"
                style={{ animationDelay: `${550 + techStack.length * 50}ms` }}
              >
                <span className="syntax-punctuation">{`} `}</span>
                <span className="text-muted-foreground">from</span>
                <span className="syntax-string"> '@pedrofelipe/stack'</span>
                <span className="syntax-punctuation">;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

CodeBlockTechStack.displayName = "CodeBlockTechStack";
