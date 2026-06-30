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
 *   import { Github } from 'lucide-react'
 *   import { Mail } from 'lucide-react'
 */

export {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
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
  Github,
  Home,
  Info,
  Link2,
  Linkedin,
  Mail,
  Menu,
  Search,
  Share2,
  Star,
  X,
} from "lucide-react";
