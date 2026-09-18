import type { NextConfig } from "next";

// TODO(refactor)[P1]: missing images.formats config — add
// formats: ["image/avif", "image/webp"]
const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  // Turbopack externalizes next-mdx-remote into a hashed virtual
  // module it then fails to resolve in dev (Cannot find module
  // 'next-mdx-remote-<hash>/rsc'). Transpiling it sidesteps that.
  transpilePackages: ["next-mdx-remote"],
  experimental: {
    // Eliminate render-blocking stylesheet requests on the first visit. This
    // portfolio uses Tailwind's atomic CSS, which is a good fit for inlining.
    inlineCss: true,
    // TODO(refactor)[P1]: optimizePackageImports is stable in
    // Next 16 — promote out of experimental
    optimizePackageImports: ["lucide-react", "simple-icons"],
  },
};

export default nextConfig;
