import type { Config } from 'prettier';
import base from './base.ts';

/** The base Prettier config with import organizing. */
const config: Config = {
    ...base,
    plugins: ['prettier-plugin-organize-imports'],
};

export default config;
