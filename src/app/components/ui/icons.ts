// TODO(refactor)[P1]: manual barrel redundant with optimizePackageImports in next.config
/**
 * Icon barrel export for lucide-react
 *
 * This file re-exports all icons used in the application from lucide-react.
 * This improves tree-shaking and allows bundlers to optimize icon imports.
 *
 * Usage:
 *   import { ArrowRight, Github, Mail } from '@/components/ui/icons'
 *
 * Instead of:
 *   import { ArrowRight } from 'lucide-react'
 *   import { Github } from '@/components/ui/icons'
 *   import { Mail } from 'lucide-react'
 */

import { createElement, type SVGProps } from "react";
import { siGithub } from "simple-icons";

const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9H7.12v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

function createBrandIcon(path: string, displayName: string) {
  const BrandIcon = (props: SVGProps<SVGSVGElement>) =>
    createElement(
      "svg",
      { viewBox: "0 0 24 24", fill: "currentColor", ...props },
      createElement("path", { d: path }),
    );

  BrandIcon.displayName = displayName;
  return BrandIcon;
}

// Lucide 1 no longer ships brand logos. Keep the existing internal API with
// brand SVGs instead of coupling call sites to a second icon component API.
export const Github = createBrandIcon(siGithub.path, "Github");
export const Linkedin = createBrandIcon(LINKEDIN_PATH, "Linkedin");

export {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  ExternalLink,
  FileText,
  FolderGit2,
  Home,
  Info,
  Link2,
  Mail,
  Menu,
  Search,
  Share2,
  Star,
  X,
} from "lucide-react";
