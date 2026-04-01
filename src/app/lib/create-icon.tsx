import type React from "react";

interface SimpleIcon {
  title: string;
  path: string;
  hex: string;
}

export interface CreatedIcon {
  icon: React.FC<{ className?: string }>;
  color: string;
}

export const createIcon = (iconData: SimpleIcon): CreatedIcon => {
  const IconComponent: React.FC<{ className?: string }> = ({ className }) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <title>{iconData.title}</title>
      <path d={iconData.path} />
    </svg>
  );
  IconComponent.displayName = `Icon${iconData.title.replace(/\s+/g, "")}`;
  return {
    icon: IconComponent,
    color: `#${iconData.hex}`,
  };
};
