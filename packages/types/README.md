# @repo/types

Shared TypeScript type definitions for the LinguaBoost monorepo.

## What's included

- **@types/node** - Node.js type definitions
- **@types/react** - React type definitions
- **@types/react-dom** - React DOM type definitions

## Usage

### For Node.js projects (API)

Add to your `package.json`:

```json
{
  "devDependencies": {
    "@repo/types": "workspace:*"
  }
}
```

Import Node.js types:

```typescript
import type { Buffer, Process } from '@repo/types/node';
```

### For React projects (Web, Desktop)

Add to your `package.json`:

```json
{
  "devDependencies": {
    "@repo/types": "workspace:*"
  }
}
```

Import React types:

```typescript
import type { FC, ReactNode } from '@repo/types/react';
```

### Benefits

- ✅ Single source of truth for type definitions
- ✅ Consistent TypeScript versions across all packages
- ✅ Easier maintenance and updates
- ✅ Reduced duplication in package.json files

## Version Updates

To update TypeScript types for the entire monorepo, just update this package:

```bash
cd packages/types
pnpm add @types/node@latest @types/react@latest @types/react-dom@latest
```
