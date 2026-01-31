# AGENTS.md - Development Guidelines

## Project Overview
Portfolio site using:
- **Runtime**: Bun
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **UI**: shadcn/ui + custom Typography system
- **Linting**: Biome 2.2.0
- **Language**: TypeScript (strict mode)

---

## Commands

### Package & Dev
```bash
bun install              # Install dependencies
bun dev                  # Start dev (http://localhost:3000)
bun build                # Build for production
bun start                # Run production build
```

### Code Quality
```bash
bun run lint             # Check all files (biome check .)
bun run lint:fix         # Auto-fix (biome check . --write)
bun run format           # Format only
bun test                 # Run all tests
bun test src/path/file.test.ts   # Run single test
bun run test:watch       # Watch mode
```

---

## Code Style Guidelines

### File Organization
- **API Routes**: `app/api/**/*.ts` - Dynamic routes with proper HTTP methods
- **Components**: `app/components/**/*.tsx` - Organized by feature
  - `ui/` - shadcn/ui + Typography system (Button, Card, H1, P, etc)
  - `common/` - Shared (Section, SectionHeader, ViewAllLink)
  - `home/`, `projects/`, etc - Feature-specific components
- **Lib**: `app/lib/**/*.ts` - Utilities and helpers
- **Types**: `app/types/**/*.ts` - TypeScript interfaces
- **Tests**: `**/*.test.ts` - Co-locate with source files

### Imports & Exports
```typescript
// ✅ Use named imports and type imports
import { Component } from '@/components/Component'
import type { Props } from '@/types/props'
export const MyComponent = () => {}

// ❌ Avoid star imports
import * as everything from 'lib'
```

### TypeScript
```typescript
// ✅ Explicit types everywhere (strict: true)
interface User {
  id: string
  email: string
}
export const fetchUser = async (id: string): Promise<User> => {}

// ❌ No implicit any
const process = (data) => {}
```

### Naming Conventions
- **Components**: PascalCase (`UserProfile.tsx`)
- **Functions**: camelCase (`getUserById`)
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_RETRIES`)
- **Files**: kebab-case or match component (`user-profile.tsx`)
- **Booleans**: Prefix `is`, `has`, `can`, `should` (`isLoading`, `hasError`)

### Formatting (Biome)
- 2-space indentation
- Single quotes
- Semicolons always
- Trailing commas
- Line width: 100 chars

Run `bun run lint:fix` to auto-fix all issues.

### Error Handling
```typescript
// ✅ Typed catch blocks
try {
  const data = await fetchData()
  return data
} catch (error) {
  if (error instanceof TypeError) console.error(error.message)
  throw new Error(`Failed: ${error}`)
}

// ❌ Silent failures
try { await risk() } catch {}
```

### React Components
```typescript
// ✅ Functional components, Server Components by default
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}

// ✅ Mark client components explicitly
'use client'
import { useState } from 'react'
export const Counter = () => {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
}
```

### UI Components (shadcn/ui)
```typescript
// ✅ Import from barrel export
import { Button, Card, H1, P } from '@/components/ui'

// ✅ Use asChild for Next.js Links
<Button asChild variant="outline">
  <Link href="/projects">View</Link>
</Button>

// Add new: bunx shadcn@latest add [name]
```

---

## Git Workflow

- Branch naming: `feature/name`, `fix/issue`, `refactor/area`
- Commit messages: `type(scope): description`
  - Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`
  - Example: `feat(home): add skills section`
- Run `bun run lint:fix` before committing

---

## Performance & Best Practices

- Minimize bundle size - use dynamic imports for heavy components
- Cache API responses appropriately
- Use Next.js Image component for optimization
- Implement proper error boundaries
- Use `React.memo` for expensive re-renders
- Leverage Server Components to reduce client-side JavaScript

---

## Product Context

**Portfolio for backend engineers**: Showcase skills, system design expertise, and project experience. Target: tech leads, recruiters, senior engineers. Aesthetic: **precision + density**, terminal/GitHub dark vibes, technical clarity over visual flair.

---

## Design Direction

Design inspirations that guide the visual language:
- **[opencode.ai](https://opencode.ai)** - Clean, technical interface with borders-only depth, monospace for data, subtle micro-interactions (150ms), minimal shadows, and gray-first color palette with sparing accent use
- **GitHub** - Developer-centric dark theme, tabular data presentation, status-based color usage
- **Linear** - Precision spacing, subtle borders, 0.5px border approach
- **Vercel** - Clean typography, technical clarity, minimal decoration

---

## Design System & UI Guidelines

### The 4px Grid
All spacing uses a 4px base grid:
- `4px` - micro spacing (icon gaps)
- `8px` - tight spacing (within components)
- `12px` - standard spacing (between related elements)
- `16px` - comfortable spacing (section padding)
- `24px` - generous spacing (between sections)
- `32px` - major separation

### Depth & Elevation Strategy
**Borders-only approach** — Clean, technical, dense. Works for precision tools. Use subtle borders (0.5px) at 8-10% opacity to define regions. Minimal shadows.

```css
border: 0.5px solid rgba(0, 0, 0, 0.08);
```

### Typography Hierarchy
- **Headlines**: 600 weight, tight letter-spacing (-0.02em)
- **Body**: 400-500 weight, standard tracking
- **Labels**: 500 weight, slight positive tracking
- **Scale**: 11px, 12px, 13px, 14px (base), 16px, 18px, 24px, 32px

### Monospace for Data
Numbers, IDs, codes, timestamps → monospace. Use `tabular-nums` for columnar alignment.

### Animation
- 150ms for micro-interactions
- 200-250ms for larger transitions
- Easing: `cubic-bezier(0.25, 1, 0.5, 1)`
- No spring/bouncy effects

### Color Usage
Gray builds structure. Color only appears for: status, action, error, success. Decorative color is noise.

### Anti-Patterns
❌ Dramatic drop shadows | Asymmetric padding | Large border radius (16px+) | Excessive spacing | Spring animations | Gradients for decoration | Multiple accent colors
