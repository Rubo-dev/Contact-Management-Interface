import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
            },
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.node
            }
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            'react': reactPlugin,
            'react-hooks': reactHooksPlugin
        },
        settings: {
            react: {
                version: 'detect'
            }
        },
        rules: {
            // ESLint base rules
            'no-console': 'off',

            // React rules
            'react/react-in-jsx-scope': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // TypeScript rules
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/prefer-nullish-coalescing': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-restricted-imports': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/restrict-plus-operands': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            'unused-imports/no-unused-imports': 'off',
            'no-unused-vars': 'off',
            'no-multiple-empty-lines': ['error', {
                'max': 1, // Maximum one empty line
                'maxEOF': 0, // No empty line at end of file
                'maxBOF': 0  // No empty line at beginning of file
            }],
            'padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: '*', next: 'return' }, // Line before return
                { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*'},
                { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var']}
            ],
            'quotes': ["error", "single"]
        },
        files: ['**/*.{ts,tsx}']
    }
];