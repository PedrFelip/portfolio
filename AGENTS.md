# AGENTS.md

## High-signal repo facts
- App Router lives under `src/app`, not `app`.
- Path alias `@/*` resolves to `./src/app/*` (see `tsconfig.json`).
- Next config enables React Compiler and `optimizePackageImports` for `lucide-react` (see `next.config.ts`).

## Commands (Bun)
- Install: `bun install`
- Dev: `bun dev`
- Build: `bun run build` (then `bun start`)
- Lint: `bun run lint` (CI runs `lint -> test -> build`)
- Fix lint/format: `bun run lint:fix` / `bun run format`
- Test all: `bun test`
- Test one file: `bun test path/to/file.test.ts`
- Watch tests: `bun run test:watch`

## Formatting / linting quirks
- Biome line width is 80 (not 100). See `biome.json`.

## Design direction (verify when touching UI)
- Blueprint/architectural aesthetic for backend portfolio; monochrome dark, precise grid, minimal shadows.
- Use blueprint grid lines and corner brackets; 4px spacing grid; small radii (2–4px); subtle 150–250ms transitions.
