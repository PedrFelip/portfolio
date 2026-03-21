import type React from "react";
import { Cpu, LayoutTemplate, Monitor, Terminal, Zap } from "lucide-react";
import {
  siGhostty,
  siFedora,
  siNiri,
  siTmux,
  siZedindustries,
} from "simple-icons";

interface SimpleIcon {
  title: string;
  path: string;
  hex: string;
}

const createIcon = (icon: SimpleIcon) => {
  const IconComponent: React.FC<{ className?: string }> = ({ className }) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
  IconComponent.displayName = `Icon${icon.title.replace(/\s+/g, "")}`;
  return {
    component: IconComponent,
    color: `#${icon.hex}`,
  };
};

export interface ToolkitIcon {
  component: React.FC<{ className?: string }>;
  color?: string;
}

export interface ToolkitItemConfig {
  id: string;
  icons: ToolkitIcon[];
}

export const TOOLKIT_CONFIG: Record<string, ToolkitItemConfig> = {
  os: {
    id: "os",
    icons: [createIcon(siFedora), createIcon(siNiri)],
  },
  editor: {
    id: "editor",
    icons: [createIcon(siZedindustries)],
  },
  terminal: {
    id: "terminal",
    icons: [createIcon(siGhostty), createIcon(siTmux)],
  },
};
