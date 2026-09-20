import type { Config } from 'prettier';

/** The base Prettier config for D&D Mapp projects. */
const config: Config = {
    overrides: [
        {
            files: ['*.yaml', '*.yml'],
            options: {
                singleQuote: false,
            },
        },
    ],
    printWidth: 120,
    quoteProps: 'consistent',
    singleQuote: true,
};

export default config;
