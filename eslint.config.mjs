import * as typescriptEslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import eslint from '@eslint/js';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintImportPlugin from 'eslint-plugin-import';

/**
 * @type {import('eslint').Config[]}
 */
export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**'],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      ecmaVersion: 2022,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      parser: tsParser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js', '*.mjs'],
        },
      },
      globals: {
        // Node.js globals
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
  ...typescriptEslint.config(
    eslint.configs.recommended,
    eslintImportPlugin.flatConfigs.recommended,
    eslintImportPlugin.flatConfigs.typescript,
    typescriptEslint.configs.recommendedTypeChecked,
    {
      rules: {
        '@typescript-eslint/unbound-method': [1, { ignoreStatic: true }],
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            'prefer': 'type-imports',
          },
        ],
        'import/order': [
          'error',
          {
            'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          },
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            'args': 'none',
          },
        ],
      },
    },
    {
      files: ['test/**/*.ts'],
      rules: {
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
      },
    },
  ),
  eslintConfigPrettier,
  pluginPrettierRecommended,
];
