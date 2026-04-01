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
import { createIcon } from "@/lib/create-icon";

export interface TechItem {
  name: string;
  color: string;
  icon: React.FC<{ className?: string }>;
}

export const TECH_STACK: Record<string, TechItem> = {
  nodejs: { name: "Node.js", ...createIcon(siNodedotjs) },
  typescript: { name: "TypeScript", ...createIcon(siTypescript) },
  nestjs: { name: "NestJS", ...createIcon(siNestjs) },
  go: { name: "Go", ...createIcon(siGo) },
  zod: { name: "Zod", ...createIcon(siZod) },
  hono: { name: "Hono", ...createIcon(siHono) },
  linux: { name: "Linux", ...createIcon(siLinux) },
  docker: { name: "Docker", ...createIcon(siDocker) },
  postgresql: { name: "PostgreSQL", ...createIcon(siPostgresql) },
  prisma: { name: "Prisma ORM", ...createIcon(siPrisma) },
  drizzle: { name: "Drizzle ORM", ...createIcon(siDrizzle) },
  redis: { name: "Redis", ...createIcon(siRedis) },
};

export const getTechStack = (keys: (keyof typeof TECH_STACK)[]): TechItem[] => {
  return keys.map((key) => TECH_STACK[key]);
};

export const DEFAULT_TECH_STACK = Object.values(TECH_STACK);
