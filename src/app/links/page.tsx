'use client';

import { Home, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { socialLinks } from '@/lib/links';
import type { SocialLink } from '@/lib/links';

const iconMap = {
  portfolio: Home,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
};

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-24">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-2 font-mono text-2xl font-semibold">
            Pedro Felipe
          </h1>
          <p className="text-sm text-muted-foreground">
            Backend Engineer & System Architect
          </p>
        </div>

        {/* Link Cards */}
        <div className="flex flex-col gap-3">
          {socialLinks.map((link: SocialLink) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.label}
                href={link.url}
                target={link.icon === 'portfolio' ? '_self' : '_blank'}
                rel={link.icon === 'portfolio' ? undefined : 'noopener noreferrer'}
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-6 py-4 transition-colors hover:border-foreground hover:bg-muted"
              >
                <Icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-base font-medium">{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
