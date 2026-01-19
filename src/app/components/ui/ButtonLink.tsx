import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { memo, type ReactNode } from "react";
import { Button, type buttonVariants } from "./button";

/**
 * ButtonLink - Link styled as a Button
 * Uses shadcn Button with asChild pattern for proper Next.js Link integration
 * @example <ButtonLink href="/projects">View Projects</ButtonLink>
 */

interface ButtonLinkProps
  extends Omit<React.ComponentProps<typeof Link>, "href">,
    VariantProps<typeof buttonVariants> {
  href: string;
  children: ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export const ButtonLink = memo(
  ({
    href,
    variant = "default",
    size = "default",
    children,
    ...props
  }: ButtonLinkProps) => {
    return (
      <Button asChild variant={variant} size={size}>
        <Link href={href} {...props}>
          {children}
        </Link>
      </Button>
    );
  },
);

ButtonLink.displayName = "ButtonLink";
