# @dnd-mapp/config-prettier

[![push main](https://github.com/dnd-mapp/config-prettier/actions/workflows/push-main.yaml/badge.svg?branch=main)](https://github.com/dnd-mapp/config-prettier/actions/workflows/push-main.yaml)
[![npm version](https://img.shields.io/npm/v/@dnd-mapp/config-prettier)](https://www.npmjs.com/package/@dnd-mapp/config-prettier)
[![license](https://img.shields.io/npm/l/@dnd-mapp/config-prettier)](LICENSE)

Shared Prettier config for consistent code formatting.

## Requirements

- Prettier 3 is a peer dependency and must be installed in your project.

## Installation

```bash
pnpm add --save-dev prettier @dnd-mapp/config-prettier
```

## Usage

Reference the config from a `.prettierrc` file in your project root.

```json
"@dnd-mapp/config-prettier"
```

To add your own options, re-export the config from a `prettier.config.js` file instead.

```js
import config from '@dnd-mapp/config-prettier';

export default {
    ...config,
    printWidth: 100,
};
```

## Available configs

| Config             | Import path                                  | Description                                     |
|:-------------------|:---------------------------------------------|:------------------------------------------------|
| `base`             | `@dnd-mapp/config-prettier/base`             | The default config for any project              |
| `organize-imports` | `@dnd-mapp/config-prettier/organize-imports` | Extends `base` with the organize imports plugin |

The package root, `@dnd-mapp/config-prettier`, resolves to `base`.

Every config ships with type declarations. Each one is typed as a Prettier `Config`, so it works in a `prettier.config.ts` file.

### `organize-imports`

This config includes everything from `base` and adds [`prettier-plugin-organize-imports`](https://github.com/simonhaenisch/prettier-plugin-organize-imports). The plugin sorts and removes unused imports when Prettier formats a file.

The plugin is an optional peer dependency, so install it together with `typescript`, which it requires. The supported versions are `prettier-plugin-organize-imports` 4 and `typescript` 6.

```bash
pnpm add --save-dev prettier prettier-plugin-organize-imports typescript @dnd-mapp/config-prettier
```

Then re-export the config from a `prettier.config.js` file.

```js
export { default } from '@dnd-mapp/config-prettier/organize-imports';
```

## What `base` sets

| Option        | Value          | Description                                      |
|:--------------|:---------------|:-------------------------------------------------|
| `printWidth`  | `120`          | Wraps code at 120 columns                        |
| `quoteProps`  | `'consistent'` | Quotes object properties only if one requires it |
| `singleQuote` | `true`         | Uses single quotes instead of double quotes      |

The config has one override. Files that match `*.yaml` or `*.yml` use double quotes, so `singleQuote` is `false` for them.

The config does not set `tabWidth`. Prettier reads it from the `.editorconfig` file in your project, so set `indent_size` there.

## Changelog

Notable changes for consumers of this package are listed in the [changelog](CHANGELOG.md).

## Contributing

Contributions are welcome. See the [contributing guide](CONTRIBUTING.md) for details.

## License

[MIT](LICENSE) © D&D Mapp
