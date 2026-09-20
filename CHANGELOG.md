# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `organize-imports` config, available as `@dnd-mapp/config-prettier/organize-imports`. It extends `base` with `prettier-plugin-organize-imports`.
- Type declarations for every config. Each one is typed as a Prettier `Config`.
- `prettier-plugin-organize-imports` and `typescript` as optional peer dependencies. Install them to use the `organize-imports` config.

## [1.0.0] - 2026-09-20

### Added

- `base` config, available as `@dnd-mapp/config-prettier` and `@dnd-mapp/config-prettier/base`.

[Unreleased]: https://github.com/dnd-mapp/config-prettier/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/dnd-mapp/config-prettier/releases/tag/v1.0.0
