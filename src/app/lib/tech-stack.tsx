import type React from "react";
import {
  siDocker,
  siDrizzle,
  siGo,
  siHono,
  siLinux,
  siNestjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siRedis,
  siTypescript,
  siZod,
} from "simple-icons";

export interface TechItem {
  name: string;
  color: string;
  icon: React.FC<{ className?: string }>;
}

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
  return IconComponent;
};

export const TECH_STACK: Record<string, TechItem> = {
  nodejs: {
    name: "Node.js",
    color: `#${siNodedotjs.hex}`,
    icon: createIcon(siNodedotjs),
  },
  typescript: {
    name: "TypeScript",
    color: `#${siTypescript.hex}`,
    icon: createIcon(siTypescript),
  },
  nestjs: {
    name: "NestJS",
    color: `#${siNestjs.hex}`,
    icon: createIcon(siNestjs),
  },
  go: {
    name: "Go",
    color: `#${siGo.hex}`,
    icon: createIcon(siGo),
  },
  zod: {
    name: "Zod",
    color: `#${siZod.hex}`,
    icon: createIcon(siZod),
  },
  hono: {
    name: "Hono",
    color: `#${siHono.hex}`,
    icon: createIcon(siHono),
  },
  linux: {
    name: "Linux",
    color: `#${siLinux.hex}`,
    icon: createIcon(siLinux),
  },
  docker: {
    name: "Docker",
    color: `#${siDocker.hex}`,
    icon: createIcon(siDocker),
  },
  postgresql: {
    name: "PostgreSQL",
    color: `#${siPostgresql.hex}`,
    icon: createIcon(siPostgresql),
  },
  prisma: {
    name: "Prisma ORM",
    color: `#${siPrisma.hex}`,
    icon: createIcon(siPrisma),
  },
  drizzle: {
    name: "Drizzle ORM",
    color: `#${siDrizzle.hex}`,
    icon: createIcon(siDrizzle),
  },
  redis: {
    name: "Redis",
    color: `#${siRedis.hex}`,
    icon: createIcon(siRedis),
  },
};

/**
 * Helper to get a list of tech items by keys
 * @example getTechStack(['nodejs', 'typescript'])
 */
export const getTechStack = (keys: (keyof typeof TECH_STACK)[]): TechItem[] => {
  return keys.map((key) => TECH_STACK[key]);
};

/**
 * Default tech stack for the home page
 */
export const DEFAULT_TECH_STACK = Object.values(TECH_STACK);
