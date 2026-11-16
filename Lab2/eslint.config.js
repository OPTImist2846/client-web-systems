import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default defineConfig(
  {
    ignores: ['dist/', 'node_modules/', 'coverage/'],
  },

  js.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,

  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      eqeqeq: ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
    },
  },

  {
    files: ['tests/**/*.ts'],
    languageOptions: {
      globals: globals.mocha,
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },

  {
    files: ['*.config.js', '*.config.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },

  prettier,
);
