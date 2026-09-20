# Contributing

Thank you for your interest in contributing to `@dnd-mapp/config-prettier`.

This package is the shared Prettier config for all D&D Mapp projects. A change here affects every project that uses it, so please keep changes small and deliberate.

## Before you start

Open an [issue](https://github.com/dnd-mapp/config-prettier/issues) to discuss any change beyond a typo fix before you send a pull request. This avoids work on changes that do not fit the goals of the package.

## Development setup

The required tool versions are enforced through `devEngines` and `engineStrict`, so installing with other versions fails.

- Node `24.21.0`
- pnpm `12.4.2`

Install the dependencies with:

```bash
pnpm install
```

Dependency versions live in the `catalog` in `pnpm-workspace.yaml`, which uses `catalogMode: strict`. Add or bump versions there and reference them with `catalog:` in `package.json`.

Newly published releases are held back for three days through `minimumReleaseAge`. You may need to wait before you can bump to a very recent version.

## Changing or adding a config

Configs are written in TypeScript and live in `src/configs/*.ts`. Import other files with the `.ts` extension, because the compiler rewrites it to `.js`. The `exports` map in `package.json` exposes each config without the extension. The package entry point, `src/index.ts`, exports the default config, which is `base`.

The `prepublishOnly` script compiles the sources to JavaScript and type declarations in `dist`. Run `pnpm exec tsc` to type check the sources without emitting anything.

When you add a config, build it on `base` by importing and spreading it, so a change to `base` reaches every config. Prettier does not merge `overrides` on spread, so concatenate the arrays instead.

Keep every config limited to formatting options. Do not add plugins or options that depend on the project or the environment. Consumers can extend the config in their own Prettier configuration.

Check and format the repository with these commands.

```bash
pnpm run format-check
pnpm run format
```

When you add or change an option, update the README in the same pull request.

- Update the "Available configs" table when you add a config.
- Update the "What `base` sets" section when you change the options of `base`.

## Changelog and versioning

This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html). Record every notable change for consumers under `[Unreleased]` in `CHANGELOG.md`, using the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format.

Changing a formatting option reformats code in every consumer project. Treat it as a breaking change and say so in the changelog entry.

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

## License

By contributing, you agree that your contributions are licensed under the [MIT license](LICENSE).
