import type React from "react";
import {
  siFedora,
  siGhostty,
  siNiri,
  siTmux,
  siZedindustries,
} from "simple-icons";
import { createIcon } from "@/lib/create-icon";

interface ToolkitIcon {
  component: React.FC<{ className?: string }>;
  color: string;
}

interface ToolkitItemConfig {
  id: string;
  icons: ToolkitIcon[];
}

const toToolkitIcon = (result: ReturnType<typeof createIcon>): ToolkitIcon => ({
  component: result.icon,
  color: result.color,
});

export const TOOLKIT_CONFIG: Record<string, ToolkitItemConfig> = {
  os: {
    id: "os",
    icons: [siFedora, siNiri].map((si) => toToolkitIcon(createIcon(si))),
  },
  editor: {
    id: "editor",
    icons: [siZedindustries].map((si) => toToolkitIcon(createIcon(si))),
  },
  terminal: {
    id: "terminal",
    icons: [siGhostty, siTmux].map((si) => toToolkitIcon(createIcon(si))),
  },
};
