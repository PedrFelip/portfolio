# AGENTS.md

## Stack & repo shape

- Next.js 16 App Router under `src/app` (not `app`); root layout is `src/app/layout.tsx`, localized routes under `src/app/[lang]/` (`about`, `blog`, `projects`).
- Single package (no monorepo). Bun runtime (`bunVersion: 1.x` in `vercel.json`).
- Path alias `@/*` → `./src/app/*` (`tsconfig.json` `paths`); `components.json` further maps `@/components`, `@/lib`, `@/hooks`, `@/components/ui` into the same tree.
- No `opencode.json` / `opencode.jsonc` — no repo-local OpenCode instruction overrides.
- `src/app/links/` is **outside** `[lang]` and explicitly excluded in `middleware.ts` — standalone route, do not nest under `[lang]`.

## Commands (Bun — do not use npm/yarn/pnpm)

- Install: `bun install`
- Dev: `bun dev` (runs `bun run --bun next dev`)
- Build: `bun run build` (`bun run next build`); start: `bun start` (`next start`)
- Lint: `bun run lint` (`biome check .`)
- Fix: `bun run lint:fix` / `bun run format` (`biome format . --write`)
- Typecheck: no script — use `bunx tsc --noEmit`
- Test (Bun native runner, not Vitest/Jest): `bun test` (all), `bun test path/to/file.test.ts` (single), `bun run test:watch`
- CI (`.github/workflows/ci.yml`): lint-only job on `push` to `main`/`master`/`feature/**`/`fix/**`/`refactor/**` + all PRs — `bun install && bun run lint`. No test/typecheck in CI.

## Config quirks (trust executable source over docs)

- `next.config.ts`: `reactCompiler: true`; `transpilePackages: ["next-mdx-remote"]` works around Turbopack dev resolution bug (`Cannot find module 'next-mdx-remote-<hash>/rsc'`); `experimental.optimizePackageImports: ["lucide-react","simple-icons"]`.
- Tailwind CSS **v4**: no `tailwind.config.*`; entry is `@import "tailwindcss"` in `src/app/globals.css` via `@tailwindcss/postcss` (`postcss.config.mjs`). Shadcn style `new-york`, `baseColor: neutral`, CSS at `src/app/globals.css` (`components.json`).
- `biome.json`: `lineWidth: 80` (README claims 100 — wrong), `indentWidth: 2` spaces, `assist.actions.source.organizeImports: "on"` (auto-sorts imports), `css.formatter.enabled: false`, `css.parser.tailwindDirectives: true`, `suspicious.noUnknownAtRules: off`, `vcs.useIgnoreFile: true`. Includes `**` but ignores `node_modules/.next/dist/build/public`.
- `tsconfig.json`: `target: ES2017`, `moduleResolution: bundler`, `jsx: react-jsx`, `strict: true`.
- `package.json` has `ignoreScripts: ["sharp","unrs-resolver"]` + `trustedDependencies` — don't remove.

## Architecture — i18n

- Custom i18n (not `next-intl`): `en` (default) + `pt`. `src/app/lib/i18n.ts` merges `src/app/lib/content/*.en.ts` / `*.pt.ts` into `translations`.
- `middleware.ts` redirects bare paths to `/[lang]/...` via: cookie `NEXT_LOCALE` → `Accept-Language` (q-weighted parse) → `DEFAULT_LANGUAGE` (`en`). Matcher is `/((?!api|_next|.*\\..*).*)` but middleware **also** early-returns for `/api`, `/_next`, `.*`, `/links` and `isLanguage(prefix)` — keep both checks in sync.
- Client state: Zustand store `src/app/lib/language-store.ts` (`useLanguage`/`useLanguageSync`); `setLanguage` sets cookie (`js-cookie`, `expires: 365`, `sameSite: Lax`) and `router.push` to swapped prefix.

## Architecture — blog & search & API

- Blog markdown lives in `src/app/content/blog/` (`.md`/`.mdx`), parsed with `gray-matter`, rendered with `next-mdx-remote` + `rehype-highlight` (`highlight.js` 11.11.1). Hide via `published: false` frontmatter. Data helpers in `src/app/lib/blog-data.ts`.
- `/api/search` (`src/app/api/search/route.ts`) is a **server** endpoint (ISR `revalidate: 604800`) returning `SearchItem[]` for `fuse.js` client search — not client-only. It re-reads each post via `getPostBySlug` to build `plainContent`/`headings`.
- `/api/github/contributions` & `/api/github/stats` require `GITHUB_TOKEN` (GraphQL). No fallback — will 500 without it.
- `sitemap.ts` / `robots.ts` / `not-found.tsx` live at `src/app/` root (outside `[lang]`); localized 404 at `src/app/[lang]/not-found.tsx`.

## Design direction (when touching UI)

- Blueprint/architectural aesthetic: monochrome dark, precise grid, minimal shadows. Use `globals.css` tokens: `blueprint` grid lines, corner brackets, 4px spacing grid, radii `2–4px` (`--radius: 0.25rem`), transitions `150–250ms` `cubic-bezier(0.25,1,0.5,1)`.
- Key utilities: `.page-rails`, `.bp-panel`, `.bp-hatch`, `.bp-line-top/bottom`, `.dot-pattern`, `.terminal-glow`. Use `overflow-x: clip` (not `hidden`) — `hidden` breaks `position: sticky`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
