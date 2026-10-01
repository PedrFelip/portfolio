# Portfolio Backend V2

A modern backend portfolio built with **Next.js**, **Bun**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

## Tech Stack

- **Runtime**: [Bun](https://bun.sh) - Fast JavaScript runtime
- **Framework**: [Next.js 16](https://nextjs.org) - React fullstack framework
- **Language**: [TypeScript](https://www.typescriptlang.org) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) - Utility-first CSS
- **UI Components**: [shadcn/ui](https://ui.shadcn.com) - Reusable React components
- **Code Quality**: [Biome](https://biomejs.dev) - Fast linter & formatter

## Quick Start

### Prerequisites

- [Bun](https://bun.sh) installed (v1.0+)

### Installation

```bash
bun install
```

### Development

The contribution graph uses the public [GitHub Contributions API](https://github.com/grubersjoe/github-contributions-api)
with a 24-hour server cache. Set the following in `.env.local` (see `.env.example`)
and in your deployment environment to override the default API URL:

```dotenv
NEXT_PUBLIC_GITHUB_CONTRIBUTIONS_API_URL=https://github-contributions-api.jogruber.de/v4
```

Contributions do not require a GitHub token. The separate GitHub stats endpoint
still requires `GITHUB_TOKEN`.

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
bun build
bun start
```

## Scripts

```bash
# Development
bun dev                    # Start dev server

# Building
bun build                  # Build for production
bun start                  # Start production server

# Code Quality
bun lint                   # Check code with Biome
bun lint:fix              # Auto-fix linting issues
bun format                # Format code with Biome

# Testing
bun test                  # Run all tests
bun test --watch         # Run tests in watch mode
bun test app/lib/helpers.test.ts  # Run specific test file
```

## Project Structure

```
app/
├── api/                  # API routes (dynamic routes)
├── components/           # React components
├── lib/                  # Utility functions & helpers
├── types/                # TypeScript types & interfaces
├── layout.tsx            # Root layout component
└── page.tsx              # Home page

public/                   # Static assets
```

## Key Features

- ✅ Full TypeScript support
- ✅ API routes with Next.js
- ✅ Tailwind CSS for styling
- ✅ shadcn/ui components ready to use
- ✅ Biome for code formatting & linting
- ✅ Git initialized with Biome pre-commit checks
- ✅ Unit tests with Bun test runner

## Code Style

This project follows strict code style guidelines enforced by Biome:

- **Indentation**: 2 spaces
- **Quotes**: Single quotes
- **Semicolons**: Always
- **Trailing commas**: All multi-line structures
- **Line length**: 100 characters (configurable)

See [AGENTS.md](./AGENTS.md) for detailed development guidelines.

## API Routes

### GET /api/projects

Returns a list of portfolio projects.

```bash
curl http://localhost:3000/api/projects
```

Response:
```json
{
  "data": [
    {
      "id": "1",
      "title": "Portfolio Backend",
      "description": "A modern backend portfolio...",
      "technologies": ["Next.js", "TypeScript", "Tailwind CSS"],
      "createdAt": "2025-01-13T00:00:00.000Z"
    }
  ],
  "success": true
}
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Bun Documentation](https://bun.sh/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Biome](https://biomejs.dev)

## License

MIT
