# Contributing to dnd-mapp/config-prettier

This page adds the details of `dnd-mapp/config-prettier` to the [shared contributing guide](https://github.com/dnd-mapp/.github/blob/main/CONTRIBUTING.md). Read that guide first.

This package is the shared Prettier config for all D&D Mapp projects. A change here affects every project that uses it, so keep changes small and deliberate.

## Checks

On top of the [shared checks](https://github.com/dnd-mapp/.github/blob/main/CONTRIBUTING.md#checks), CI runs `lint-ts`, `typecheck`, and `build`. Run them yourself before you open a pull request.

```bash
pnpm run lint-ts
pnpm run typecheck
pnpm run build
```

The `lint-ts` script lints the code with ESLint.

## Changing or adding a config

Configs are written in TypeScript and live in `src/configs/*.ts`. Import other files with the `.ts` extension, because the compiler rewrites it to `.js`. The `exports` map in `package.json` exposes each config without the extension. The package entry point, `src/index.ts`, exports the default config, which is `base`.

The `build` script compiles the sources to JavaScript and type declarations in `dist`. The `prepublishOnly` script runs it, and then runs `prepare-dist` from `@dnd-mapp/package-builder`. That command writes the trimmed `package.json`, copies the files listed in `.prepare-distrc.json`, and checks the `exports`. Run `pnpm run typecheck` to type check the sources without emitting anything.

When you add a config, build it on `base` by importing and spreading it, so a change to `base` reaches every config. Prettier does not merge `overrides` on spread, so concatenate the arrays instead.

When a config uses a plugin, list that plugin as an optional peer dependency in `package.json`, and document it in the README. Consumers install it only when they use that config.

Keep every config limited to formatting options and the plugins that format code. Do not add options that depend on the project or the environment. Keep `base` free of plugins. Consumers can extend the config in their own Prettier configuration.

When you add or change an option, update the README in the same pull request.

- Update the "Available configs" table when you add a config.
- Update the "What `base` sets" section when you change the options of `base`.

## Changelog and versioning

This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html). Record every notable change for consumers under `[Unreleased]` in `CHANGELOG.md`, using the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.

Changing a formatting option reformats code in every consumer project. Treat it as a breaking change and say so in the changelog entry.

## Releasing

1. Run the [prepare release workflow](../../.github/workflows/prepare-release.yaml) on `main` with the part of the version to bump, for example `gh workflow run prepare-release.yaml -f bump=minor`. It opens the `chore: release X.Y.Z` pull request with auto-merge on.
2. Review and approve the pull request. Once it merges, the `tag` job of the [push workflow](../../.github/workflows/push-main.yaml) creates the annotated tag `vX.Y.Z` on the merge commit.
3. The [release workflow](../../.github/workflows/release.yaml) runs the CI checks, verifies the tag and the changelog, stages the package on npm, and creates the GitHub Release, which opens a discussion in the Announcements category.
4. Find the staged version with `pnpm stage list` and approve it with `pnpm stage approve <id>` and 2FA.

If the staged version is wrong, reject it with `pnpm stage reject <id>`. The same version cannot be staged again until then.
