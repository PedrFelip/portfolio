"use client";

import Link from "next/link";
import type { JSX } from "react";
import { memo } from "react";
import { ArrowRight, BookOpen, FolderGit2, Home } from "@/components/ui/icons";
import { useLanguage } from "@/lib/language-store";
import { useLocalizedLink } from "@/lib/useLocalizedLink";

interface NavItem {
  label: string;
  href: string;
  icon: JSX.Element;
}

const NotFoundLinkItem = memo(({ item }: { item: NavItem }) => (
  <Link
    href={item.href}
    className="group flex items-center gap-4 px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6 lg:py-5 rounded-lg border border-transparent transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-surface-4 hover:-translate-y-0.5 hover:border-accent/20 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  >
    <div className="flex flex-shrink-0 items-center justify-center">
      {item.icon}
    </div>

    <div className="flex min-w-0 flex-1 flex-col">
      <span className="text-base font-semibold tracking-tight text-foreground transition-colors duration-150 sm:text-lg lg:text-xl">
        {item.label}
      </span>
    </div>

    <ArrowRight
      className="size-5 sm:size-6 lg:size-7 flex-shrink-0 text-muted-foreground/40 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1.5 group-hover:scale-110 group-hover:text-accent"
      strokeWidth={1.5}
      aria-hidden="true"
    />
  </Link>
));

NotFoundLinkItem.displayName = "NotFoundLinkItem";

export function NotFound() {
  const { t } = useLanguage();
  const getLocalizedLink = useLocalizedLink();

  const navItems: NavItem[] = [
    {
      label: t.notFound.cta,
      href: getLocalizedLink("/"),
      icon: (
        <Home
          className="size-6 sm:size-7 lg:size-8 text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-hover:rotate-3 group-hover:text-accent"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ),
    },
    {
      label: t.nav.projects,
      href: getLocalizedLink("/projects"),
      icon: (
        <FolderGit2
          className="size-6 sm:size-7 lg:size-8 text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-hover:rotate-3 group-hover:text-accent"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ),
    },
    {
      label: t.nav.blog,
      href: getLocalizedLink("/blog"),
      icon: (
        <BookOpen
          className="size-6 sm:size-7 lg:size-8 text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-hover:rotate-3 group-hover:text-accent"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <p className="mb-2 text-center text-7xl sm:text-8xl lg:text-9xl font-semibold tracking-tighter bg-gradient-to-br from-foreground via-foreground to-accent bg-clip-text text-transparent">
          404
        </p>

        <h1 className="mb-2 text-center text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-foreground">
          {t.notFound.title}
        </h1>

        <p className="mb-8 text-center text-sm text-foreground/70 sm:text-base">
          {t.notFound.description}
        </p>

        <div className="flex flex-col gap-1 sm:gap-1.5 lg:gap-2">
          {navItems.map((item) => (
            <NotFoundLinkItem key={item.href} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
