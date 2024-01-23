/** @type {import("@types/eslint").Linter.Config} */
const typescriptConfig = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/unbound-method': [1, { ignoreStatic: true }],
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-explicit-any': 0,
  },
};

/** @type {import("@types/eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  reportUnusedDisableDirectives: true,
  overrides: [
    {
      ...typescriptConfig,
      files: ['*.ts'],
    },
    {
      ...typescriptConfig,
      files: ['*.spec.ts', 'test/**/*.ts'],
      env: {
        es2022: true,
        mocha: true,
      },
      parserOptions: {
        project: './tsconfig.spec.json',
      },
      rules: {
        ...typescriptConfig.rules,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-call': 0,
      },
    },
    {
      files: ['*.js'],
      parser: 'espree',
      plugins: ['prettier'],
      extends: ['eslint:recommended', 'plugin:prettier/recommended'],
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2022,
      },
      rules: {},
    },
  ],
};
