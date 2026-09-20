/** @type {import('prettier').Config} */
const config = {
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
