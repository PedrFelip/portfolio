# Structural Grid

The **Structural Grid** (also called "Exposed Grid" or "Rail Layout") is a design system skill for AI coding agents. It implements the modern SaaS landing page pattern where the underlying page grid is promoted to a first-class visual element — used by Linear, Vercel, Resend, Profound, and Planetscale.

## What It Does

When activated, this skill instructs your AI coding agent to build pages using the Structural Grid architecture:

- **Visible vertical rail lines** running the full page height as decorative elements
- **Horizontal section dividers** spanning rail-to-rail between content sections
- **Dashed internal borders** between grid cells with solid external structure
- **Dot-pattern backgrounds** for alternating section depth
- **Responsive border logic** that adapts across mobile, tablet, and desktop breakpoints
- **Component recipes** for buttons, inputs, navbars, and feature cards — all designed to sit within the rail system

## Live Examples

Sites built entirely by Claude Code using this skill:

| Site | Description |
|------|-------------|
| [Onyx](https://onyx-dev-ten.vercel.app/) | AI-powered DevOps platform landing page |
| [Aura](https://aura-agency-nine.vercel.app/) | AI ambient soundscape app landing page |


<img width="1920" height="1080" alt="aura-dark" src="https://github.com/user-attachments/assets/e2b31b10-de5c-4a31-b5ce-44bc13b853cd" />

<img width="1920" height="1080" alt="only-dark" src="https://github.com/user-attachments/assets/b569d7f8-b7bc-4422-9656-ec8be9af47ac" />

## Installation

```bash
npx skills add nabinkhair42/structural-grid-skill
```

Or with the full GitHub URL:

```bash
npx skills add https://github.com/nabinkhair42/structural-grid-skill
```

## Tech Stack

- **CSS** — Custom properties (`--rail-offset`), pseudo-elements, `overflow-x: clip`
- **Tailwind CSS** — Utility classes, responsive prefixes (`sm:max-lg:`, `max-sm:`)
- **React / Next.js** — TSX component patterns, App Router conventions
- **shadcn/ui compatible** — Uses `var(--border)`, `text-foreground`, `text-muted-foreground`

## What's Included

| Category | Contents |
|----------|----------|
| **CSS Foundation** | `.page-rails`, `.rail-bounded`, `.section-divider`, `.dot-pattern` |
| **Section Patterns** | Text headers, dashed-divider grids, side-by-side layouts, hero sections, CTAs |
| **Component Recipes** | Button variants, input fields, icon containers, navbar with scroll tracking |
| **Animation Patterns** | IntersectionObserver-based reveal with staggered entrance |
| **Design Tokens** | Complete reference table for all border styles, colors, and hover states |
| **Common Pitfalls** | 15 documented gotchas with solutions (overflow-x, sticky, responsive borders, etc.) |

## License

MIT
