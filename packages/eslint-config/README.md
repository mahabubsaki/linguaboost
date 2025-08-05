# @repo/eslint-config

Shared ESLint configurations for the LinguaBoost monorepo.

## Configurations

- `@repo/eslint-config/base` - Base ESLint config
- `@repo/eslint-config/next-js` - Next.js specific config
- `@repo/eslint-config/react-internal` - React internal config
- `@repo/eslint-config/electron` - Electron app config

## Usage

### For Electron apps

Create an `eslint.config.mjs` file:

```js
import config from '@repo/eslint-config/electron';

export default config;
```

### For Next.js apps

Create an `eslint.config.js` file:

```js
const config = require('@repo/eslint-config/next-js');

module.exports = config;
```

### Installation

Add to your `package.json`:

```json
{
  "devDependencies": {
    "@repo/eslint-config": "workspace:*"
  }
}
```

Then install globally in the root:

```bash
pnpm add -w eslint
```
