# Contributing

Thank you for your interest in contributing to `@dnd-mapp/config-prettier`.

This package is the shared Prettier config for all D&D Mapp projects. A change here affects every project that uses it, so please keep changes small and deliberate.

## Before you start

Open an [issue](https://github.com/dnd-mapp/config-prettier/issues) to discuss any change beyond a typo fix before you send a pull request. This avoids work on changes that do not fit the goals of the package.

## Development setup

The required Node and pnpm versions are set in `devEngines` in `package.json`. They are enforced through `engineStrict`, so installing with other versions fails.

Install the dependencies with:

```bash
pnpm install
```

Dependency versions live in the catalogs in `pnpm-workspace.yaml`, which uses `catalogMode: strict`. Add or bump versions there and reference them in `package.json`. Use `catalog:` for the default catalog and `catalog:prettier` for Prettier and its plugins.

Newly published releases are held back for three days through `minimumReleaseAge`. You may need to wait before you can bump to a very recent version.

Install [actionlint](https://github.com/rhysd/actionlint) to lint the workflows locally, for example with `brew install actionlint`. CI runs the version that `.github/actions/ci/action.yaml` pins.

## Git hooks

[Lefthook](https://lefthook.dev/) installs the Git hooks when you run `pnpm install`. The hooks are defined in `lefthook.yaml`. `pnpm-workspace.yaml` turns off the side-effects cache of pnpm, because a cached build of lefthook skips the script that installs the hooks. If the hooks are still missing, install them with `pnpm exec lefthook install`.

| Hook         | Runs                                           | On                        |
|:-------------|:-----------------------------------------------|:--------------------------|
| `pre-commit` | Prettier, markdownlint-cli2, and ESLint checks | The staged files          |
| `commit-msg` | commitlint                                     | The message of the commit |

The pre-commit hooks only check files. Run `pnpm run format` to fix formatting issues, and `pnpm exec eslint --fix` to apply the fixes that ESLint can make. Stage the result.

## Changing or adding a config

Configs are written in TypeScript and live in `src/configs/*.ts`. Import other files with the `.ts` extension, because the compiler rewrites it to `.js`. The `exports` map in `package.json` exposes each config without the extension. The package entry point, `src/index.ts`, exports the default config, which is `base`.

The `build` script compiles the sources to JavaScript and type declarations in `dist`. The `prepublishOnly` script runs it, and then runs `prepare-dist` from `@dnd-mapp/package-builder`. That command writes the trimmed `package.json`, copies the files listed in `.prepare-distrc.json`, and checks the `exports`. Run `pnpm run typecheck` to type check the sources without emitting anything.

When you add a config, build it on `base` by importing and spreading it, so a change to `base` reaches every config. Prettier does not merge `overrides` on spread, so concatenate the arrays instead.

When a config uses a plugin, list that plugin as an optional peer dependency in `package.json`, and document it in the README. Consumers install it only when they use that config.

Keep every config limited to formatting options and the plugins that format code. Do not add options that depend on the project or the environment. Keep `base` free of plugins. Consumers can extend the config in their own Prettier configuration.

Check and format the repository with these commands. CI runs `format-check`, `lint-md`, `lint-ts`, `typecheck`, `build`, and actionlint.

```bash
pnpm run format-check
pnpm run format
pnpm run lint-md
pnpm run lint-ts
pnpm run typecheck
pnpm run build
actionlint
```

The `lint-md` script lints the Markdown files with markdownlint, and the `lint-ts` script lints the code with ESLint.

When you add or change an option, update the README in the same pull request.

- Update the "Available configs" table when you add a config.
- Update the "What `base` sets" section when you change the options of `base`.

## Changelog and versioning

This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html). Record every notable change for consumers under `[Unreleased]` in `CHANGELOG.md`, using the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.

Changing a formatting option reformats code in every consumer project. Treat it as a breaking change and say so in the changelog entry.

## Releasing

1. Open a pull request with a single `chore: release X.Y.Z` commit. It sets `version` in `package.json`, renames `[Unreleased]` to `[X.Y.Z] - YYYY-MM-DD`, adds a fresh `[Unreleased]`, and updates the link references.
2. Merge it, then create an annotated tag `vX.Y.Z` on the merge commit and push the tag.
3. The [release workflow](.github/workflows/release.yaml) runs the CI checks, verifies the tag and the changelog, stages the package on npm, and creates the GitHub Release.
4. Find the staged version with `pnpm stage list` and approve it with `pnpm stage approve <id>` and 2FA.

If the staged version is wrong, reject it with `pnpm stage reject <id>`. The same version cannot be staged again until then.

## Code style

Follow the rules in `.editorconfig`.

- Use UTF-8 and LF line endings.
- Indent with 4 spaces, or 2 spaces in `package.json` and `pnpm-*.yaml`.
- End every file with a newline and trim trailing whitespace.

Follow these rules for prose, including Markdown files.

- Never hard wrap prose. Write each paragraph or list item on a single line.
- Use US spelling, for example "color" and "behavior".
- Keep every sentence at or under 40 words.
- Pretty print Markdown tables so the columns line up, with alignment markers on every separator line.

## Branches

Create a branch from `main` for each change. Name it `<type>/<short-description>` in lowercase with hyphens between words, for example `feat/add-yaml-override` or `fix/print-width`.

Use the same types as for commits.

## Commits

Write commit messages that follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

```text
<type>(<optional scope>): <description>
```

Use one of these types.

| Type       | Use for                                           |
|:-----------|:--------------------------------------------------|
| `feat`     | A new option or override                          |
| `fix`      | A correction to an existing option                |
| `docs`     | Changes to documentation only                     |
| `refactor` | Changes that do not alter the behavior of configs |
| `build`    | Changes to packaging, dependencies, or tooling    |
| `chore`    | Other maintenance that does not fit above         |

Write the description in the imperative mood, such as "add yaml override". Mark a breaking change with `!` after the type or scope, and add a `BREAKING CHANGE:` footer that explains what consumers must do.

## Pull requests

- Keep each pull request to one change.
- Link the issue it addresses.
- Update the changelog and README in the same pull request.
- Use a title that follows the commit convention.
- If you have write access, turn on auto-merge once the pull request is open, with `gh pr merge <number> --auto --merge` or the "Enable auto-merge" button. It then merges as soon as it is approved and the checks pass.
- If auto-merge is off, the author merges the pull request once it is approved and the checks pass. A maintainer merges pull requests opened by a contributor without write access.
- Renovate merges its own minor and patch pull requests once the checks pass. A maintainer approves a major update from Renovate and turns on auto-merge for it.
- Update the branch when it falls behind `main`, because auto-merge waits until the branch is up to date. The update dismisses the approval, so the pull request needs a new review.

## License

By contributing, you agree that your contributions are licensed under the [MIT license](LICENSE).
