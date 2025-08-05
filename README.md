# Turborepo starter


# Linguaboost Monorepo

This monorepo is built with [Turborepo](https://turborepo.com/) and managed with [pnpm workspaces](https://pnpm.io/workspaces). It contains production-ready apps and shared packages for web, desktop, and mobile.

## Monorepo Structure

### Apps

- `web`: [Next.js 15.4.5](https://nextjs.org/) app (React 19.1.1)
- `desktop`: [Electron](https://www.electronjs.org/) app (React 19.1.1)
- `mobile`: [Expo React Native](https://docs.expo.dev/) app (React 19.1.1)
- `api`: [Hono](https://hono.dev/) Node.js API server

### Packages

- `@repo/react`: Shared React 19.1.1 and react-dom 19.1.1 package (all apps depend on this for consistent React versioning)
- `@repo/ui`: Shared React component library (depends on `@repo/react`)
- `@repo/types`: Shared TypeScript types (includes React 19 types)
- `@repo/typescript-config`: Shared `tsconfig.json` base configs
- `@repo/eslint-config`: Shared ESLint config
- `@repo/prettier-config`: Shared Prettier config

## Development

Install dependencies:

```sh
pnpm install
```

Start development for all apps:

```sh
pnpm dev
```

Or start a specific app (e.g. web):

```sh
pnpm dev --filter=web
```

## Build

To build all apps and packages:

```sh
pnpm build
turbo build


To build a specific app or package:

```sh
pnpm build --filter=web
pnpm build --filter=desktop
pnpm build --filter=mobile
pnpm build --filter=api
```

## Shared React Versioning

All apps and packages use a single shared React version (`@repo/react`), currently React 19.1.1 and react-dom 19.1.1. This ensures compatibility and avoids version mismatches across web, desktop, and mobile.

## Notes

- All code is written in [TypeScript](https://www.typescriptlang.org/)
- Linting and formatting are enforced with [ESLint](https://eslint.org/) and [Prettier](https://prettier.io)
- [Turborepo](https://turborepo.com/) is used for fast, incremental builds and task running
- [pnpm](https://pnpm.io/) is used for workspace management and dependency hoisting

---

For more, see the individual app and package README files.

