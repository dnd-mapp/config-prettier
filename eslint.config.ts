import javascript from '@dnd-mapp/config-eslint/javascript';
import typescript from '@dnd-mapp/config-eslint/typescript';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores(['dist/', '.tmp/']),
    javascript,
    typescript,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
]);
