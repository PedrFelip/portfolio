import { memo } from "react";
/**
 * SectionDivider - Horizontal line between sections
 * Spans between the vertical rail lines
 */
export const SectionDivider = memo(function SectionDivider() {
  return (
    <div>
      <div className="section-divider" aria-hidden="true" />
    </div>
  );
});

SectionDivider.displayName = "SectionDivider";
