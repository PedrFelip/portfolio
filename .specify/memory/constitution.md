# Pedro Felipe's Portfolio Constitution{

"meta": {

## Core Principles "name": "Svelte Portfolio Design System",

    "description": "Constituição de design tokens para o portfólio Svelte com Tailwind e Shadcn/UI.",

### I. Component-First Architecture "version": "1.0.0",

Every feature or section of the portfolio starts as a reusable, self-contained Svelte component. Components must be: "author": "Pedro Felipe"

- **Self-contained**: No external state dependencies beyond props and stores },

- **Independently testable**: Each component can be tested in isolation "tokens": {

- **Well-documented**: Clear prop interfaces, slots, and event handlers documented "color": {

- **Consistent styling**: All components adhere to the design token system (Tailwind + CSS variables) "background": {

        "light": "hsl(var(--background))",

### II. Design Token Consistency "dark": "hsl(var(--background))"

All visual design elements must be defined and managed through the design token system: },

- **Single source of truth**: Colors, typography, spacing, and shadows defined in `tailwind.config.js` and CSS variables "foreground": {

- **Dark/Light mode support**: All tokens support both light and dark themes via CSS custom properties "light": "hsl(var(--foreground))",

- **No magic values**: Hardcoded colors, sizes, or spacing are prohibited; use tokens instead "dark": "hsl(var(--foreground))"

- **Shadcn/UI compliance**: Component styling follows Shadcn/UI patterns and conventions },

      "primary": {

### III. Type Safety & Accessibility (Non-Negotiable) "light": "hsl(var(--primary))",

TypeScript must be used throughout the project with strict mode enabled: "dark": "hsl(var(--primary))"

- **Full type coverage**: All Svelte components, routes, and utilities must have explicit types },

- **Accessibility first**: Components must include proper ARIA attributes, semantic HTML, and keyboard navigation "primary-foreground": {

- **A11y testing**: Color contrast must meet WCAG AA standards; focus states must be visible "light": "hsl(var(--primary-foreground))",

- **Props validation**: Component interfaces must be explicitly typed; no `any` types allowed "dark": "hsl(var(--primary-foreground))"

      },

### IV. Content-Driven Development "secondary": {

Blog and portfolio content is managed through structured data files: "light": "hsl(var(--secondary))",

- **Markdown content**: Blog posts and documentation stored in `src/content/` as `.md` files "dark": "hsl(var(--secondary))"

- **Typed content loading**: Content is parsed and typed via `+page.server.ts` route handlers },

- **SEO optimization**: Each content page must have proper meta tags (title, description, OG tags) "secondary-foreground": {

- **i18n support**: All content strings support Portuguese (pt) and English (en) translations "light": "hsl(var(--secondary-foreground))",

        "dark": "hsl(var(--secondary-foreground))"

### V. Performance & Bundle Optimization },

The portfolio must maintain high performance standards: "accent": {

- **Code splitting**: Routes are code-split automatically via SvelteKit; lazy loading for non-critical components "light": "hsl(var(--accent))",

- **Image optimization**: Images use optimized formats; hero images use `BlurFade` or `StarryBackground` for perceived performance "dark": "hsl(var(--accent))"

- **CSS efficiency**: Tailwind CSS purges unused classes; inline critical CSS where necessary },

- **Bundle monitoring**: Build size must not exceed 200KB (gzipped); animation libraries kept minimal "accent-foreground": {

        "light": "hsl(var(--accent-foreground))",

## Design & Styling Standards "dark": "hsl(var(--accent-foreground))"

      },

### Design System Usage "muted": {

- **Tailwind CSS**: Primary utility framework; all spacing, colors, and responsive design via Tailwind "light": "hsl(var(--muted))",

- **Shadcn/UI components**: Use pre-built `ui/` components (`Button`, `Card`, `Badge`, `Avatar`, etc.) for consistency "dark": "hsl(var(--muted))"

- **Custom animations**: Magic components (`BlurFade`, `Dock`, `StarryBackground`) reserved for hero sections and highlights },

- **Responsive design**: Mobile-first approach; breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px) "muted-foreground": {

        "light": "hsl(var(--muted-foreground))",

### Color Palette "dark": "hsl(var(--muted-foreground))"

- **Primary**: Brand color for CTA buttons and links },

- **Secondary**: Supporting color for secondary actions "border": {

- **Accent**: Highlights and decorative elements "light": "hsl(var(--border))",

- **Muted**: Disabled states, placeholders, subtle text "dark": "hsl(var(--border))"

- **Destructive**: Error states and dangerous actions },

- **Background/Foreground**: Page backgrounds and text; mode-aware "input": {

        "light": "hsl(var(--input))",

### Typography "dark": "hsl(var(--input))"

- **Font families**: Inter Variable (sans-serif), JetBrains Mono (code) },

- **Font sizes**: xs (0.75rem) → 5xl (3rem); use semantic scales "ring": {

- **Font weights**: Normal (400), Medium (500), Bold (700) "light": "hsl(var(--ring))",

- **Line heights**: Tight (1.25), Normal (1.5), Relaxed (1.75) "dark": "hsl(var(--ring))"

      }

## Development Workflow },

    "typography": {

### File Organization "fontFamily": {

````"sans": "'Inter Variable', sans-serif",

src/        "mono": "'JetBrains Mono', monospace"

├── lib/      },

│   ├── components/      "fontSize": {

│   │   ├── magic/         → Special effects (BlurFade, Dock, StarryBackground)        "xs": "0.75rem",

│   │   ├── portfolio/     → Page-specific components (Navbar, ProjectCard, etc.)        "sm": "0.875rem",

│   │   └── ui/            → Reusable UI components (Button, Card, Badge, etc.)        "base": "1rem",

│   ├── data/              → Static data (resume.ts)        "lg": "1.125rem",

│   ├── i18n/              → Internationalization (en.ts, pt.ts)        "xl": "1.25rem",

│   ├── types.ts           → Shared TypeScript types        "2xl": "1.5rem",

│   ├── utils.ts           → Utility functions        "3xl": "1.875rem",

│   └── imgs/              → Image assets        "4xl": "2.25rem",

├── routes/        "5xl": "3rem"

│   ├── +layout.svelte     → Root layout      },

│   ├── +page.svelte       → Home page      "fontWeight": {

│   ├── api/content/       → API route for content listing        "normal": "400",

│   └── blog/              → Blog route with [slug] dynamic route        "medium": "500",

├── content/               → Markdown blog posts and documentation        "semibold": "600",

└── app.css                → Global styles and CSS variables        "bold": "700"

```      },

      "lineHeight": {

### Git & Version Control        "tight": "1.25",

- **Commit messages**: Follow conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`        "normal": "1.5",

- **Branch naming**: `feature/`, `bugfix/`, `docs/` prefixes for clarity        "relaxed": "1.75"

- **PR requirements**: All PRs must pass TypeScript checks, ESLint rules, and visual regression tests      }

- **Code review**: At least one approval required before merge    },

    "spacing": {

### Build & Deployment      "xs": "0.25rem",

- **Dev server**: `npm run dev` → http://localhost:5173      "sm": "0.5rem",

- **Build**: `npm run build` → Static files in `build/`      "md": "1rem",

- **Preview**: `npm run preview` → Test production build locally      "lg": "1.5rem",

- **Linting**: `npm run lint` → ESLint rules enforced before commit      "xl": "2rem",

- **Type checking**: `npm run check` → TypeScript strict mode validation      "2xl": "3rem"

    },

## Component Standards    "radius": {

      "sm": "0.25rem",

### Svelte Component Template      "md": "0.375rem",

```svelte      "lg": "0.5rem",

<script lang="ts">      "xl": "0.75rem",

  import { onMount } from 'svelte';      "2xl": "1rem",

        "full": "9999px"

  // Props with explicit types    },

  export let title: string;    "shadow": {

  export let variant: 'default' | 'secondary' = 'default';      "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",

  export let disabled: boolean = false;      "md": "0 4px 6px -1px rgb(0 0 0 / 0.1)",

      "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1)",

  // Component state      "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1)"

  let isLoading = false;    },

    "animation": {

  // Lifecycle hooks      "fast": "150ms ease-in-out",

  onMount(() => {      "normal": "300ms ease-in-out",

    // Initialization logic      "slow": "500ms ease-in-out"

  });    }

  },

  // Event handlers  "modes": {

  function handleClick() {    "default": "light",

    // Logic here    "available": ["light", "dark"]

  }  },

</script>  "output": {

    "targets": [

<!-- Template with semantic HTML -->      {

<div class="component" aria-label={title}>        "type": "tailwind",

  <slot />        "path": "tailwind.config.js"

</div>      },

      {

<!-- Scoped styles (inline if minimal) -->        "type": "css",

<style>        "path": "src/styles/tokens.css"

  .component {      }

    /* CSS variables for tokens */    ]

  }  }

</style>}

````

### Props & Events

- **Props**: Always use TypeScript types; document with JSDoc comments
- **Events**: Use `dispatch()` for custom events; prefer named events (e.g., `on:select`, `on:close`)
- **Slots**: Name slots for multiple content areas; document slot usage in comments

### Testing

- **Unit tests**: Test component logic, props validation, event handling (Vitest recommended)
- **Visual tests**: Storybook or visual regression tests for UI components
- **Integration tests**: Test routes, API calls, and multi-component interactions
- **A11y tests**: axe-core or similar for accessibility validation

## i18n & Localization

### Translation Management

- **Translation files**: Separate files for each language (`en.ts`, `pt.ts`) in `src/lib/i18n/`
- **Fallback language**: English is the fallback if translation is missing
- **Dynamic language switching**: Use `LanguageToggle` component to switch between pt/en
- **Content localization**: Blog posts can have language-specific versions via slug convention

### Language Store

All language state managed via Svelte store; reactive updates across the entire app.

## Content Management

### Blog Posts

- **Location**: `src/content/*.md`
- **Metadata**: YAML front matter with title, date, tags, excerpt
- **Rendering**: Markdown parsed server-side; route handlers in `+page.server.ts`
- **Naming**: Kebab-case file names (e.g., `primeiro-post.md`, `niri.md`)

### Portfolio Data

- **Resume**: Typed data in `src/lib/data/resume.ts`
- **Projects**: Project metadata in route data or static file
- **Images**: Optimized images in `static/images/`; use lazy loading where appropriate

## Quality Gates

### Pre-commit Hooks

- ESLint validation
- TypeScript type checking
- Prettier formatting (optional, recommended)

### Before Each Release

- All tests passing
- No console errors or warnings
- Bundle size within limits
- Light & dark mode verified
- Mobile responsiveness checked
- SEO meta tags present

### Documentation Requirements

- All public components documented (props, events, slots)
- Complex functions include JSDoc comments
- README.md kept up-to-date
- CHANGELOG.md updated for releases

## Governance

### Constitution Status

This constitution is the **single source of truth** for portfolio development standards. All code must comply with these principles.

### Amendment Process

1. **Propose**: Create an issue or discussion describing the change
2. **Discuss**: Get feedback from the development team
3. **Document**: Update this constitution with new rules and rationale
4. **Migrate**: Update existing code to comply (or grandfather existing code)
5. **Communicate**: Announce changes to all contributors

### Exceptions

- Exceptions must be documented in a comment with the reason
- Exceptions require explicit approval before merging
- Recurring exceptions indicate a constitution update is needed

---

**Version**: 1.0.0 | **Ratified**: 2025-11-11 | **Last Amended**: 2025-11-11  
**Project**: Pedro Felipe's Portfolio | **Framework**: SvelteKit + Tailwind + Shadcn/UI
