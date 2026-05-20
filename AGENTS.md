# AGENTS.md

## High-signal repo facts

- App Router lives under `src/app`, not `app`.
- Path alias `@/*` resolves to `./src/app/*` (see `tsconfig.json`).
- Next config enables React Compiler and `optimizePackageImports` for `lucide-react` + `simple-icons` (see `next.config.ts`).
- Tailwind CSS **v4** — uses `@import "tailwindcss"` in `globals.css`, not a `tailwind.config.*` file.

## Commands (Bun)

- Install: `bun install`
- Dev: `bun dev`
- Build: `bun run build` (then `bun start`)
- Lint: `bun run lint`
- Fix lint/format: `bun run lint:fix` / `bun run format`
- Test all: `bun test`
- Test one file: `bun test path/to/file.test.ts`
- Watch tests: `bun run test:watch`

CI (`lint` job only): `bun install && bun run lint`

## Formatting / linting quirks

- Biome line width is **80** (not 100). See `biome.json`.
- Biome organizes imports automatically (`assist.actions.source.organizeImports: "on"`).

## Architecture

### i18n (custom, not next-intl)

- Two languages: `en` (default) and `pt`.
- `src/app/[lang]/` is the localized route group; `middleware.ts` redirects bare paths to `/[lang]/...` using cookie → Accept-Language fallback.
- `src/app/lib/content/` holds translation objects (`home.en.ts`, `home.pt.ts`, etc.), merged in `src/app/lib/i18n.ts`.
- Language state is a Zustand store (`src/app/lib/language-store.ts`); switching sets a cookie and does a client-side router push.
- `src/app/links/` is **outside** `[lang]` (excluded from middleware) — it's a standalone page.

### Blog

- Markdown posts live in `src/app/content/blog/` (`.md` or `.mdx`).
- Parsed with `gray-matter` for frontmatter, rendered with `next-mdx-remote` + `rehype-highlight`.
- Set `published: false` in frontmatter to hide a post.

### API routes

- `/api/github/contributions` and `/api/github/stats` — require `GITHUB_TOKEN` env var (GraphQL API).
- `/api/search` — client-side search via `fuse.js`.

## Design direction (verify when touching UI)

- Blueprint/architectural aesthetic for backend portfolio; monochrome dark, precise grid, minimal shadows.
- Use blueprint grid lines and corner brackets; 4px spacing grid; small radii (2–4px); subtle 150–250ms transitions.
