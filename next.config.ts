import type { NextConfig } from "next";

// TODO(refactor)[P1]: missing images.formats config — add
// formats: ["image/avif", "image/webp"]
const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  optimizePackageImports: ["lucide-react", "simple-icons"],
  // Turbopack can externalize ESM-only MDX packages into hashed virtual
  // modules that Bun then fails to resolve in dev. Bundling them avoids
  // runtime imports such as `next-mdx-remote-<hash>` and `shiki-<hash>`.
  transpilePackages: ["next-mdx-remote", "rehype-pretty-code", "shiki"],
  experimental: {
    // Eliminate render-blocking stylesheet requests on the first visit. This
    // portfolio uses Tailwind's atomic CSS, which is a good fit for inlining.
    inlineCss: true,
  },
};

export default nextConfig;
