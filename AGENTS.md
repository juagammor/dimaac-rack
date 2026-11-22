<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


# Build and development instructions

## Build instructions
- This project must use Webpack for production builds.
- Do NOT use Turbopack for production builds.
- Always use `npm run build` to build the project.
- The build script must include the `--webpack` flag.
- Do not execute `next build` directly without the `--webpack` flag.

## Memory considerations
- The development environment runs on a machine with 16 GB RAM.
- Avoid running multiple production builds simultaneously.
- Do not increase Node.js memory limits without checking actual memory usage first.

## Validation
- After modifying the code, run `npm run build`.
- If the build fails, inspect the error before attempting alternative build configurations.
- Do not switch to Turbopack as a workaround.


