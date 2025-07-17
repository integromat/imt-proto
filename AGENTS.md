# Integromat Proto-Classes Agent Guidelines

## Build Commands

- **Build**: `npm run build` (TypeScript compilation)
- **Test**: `npm test` (lint + unit tests) or `npm run test:unit` (unit tests only)
- **Test single file**: `npx jest test/[filename].spec.ts` (e.g., `npx jest test/action.spec.ts`)
- **Lint**: `npm run lint` (ESLint), `npm run lint:fix` (auto-fix)
- **Format**: `npm run format` (Prettier), `npm run format:check` (check only)

## External File Loading

CRITICAL: When you encounter a file reference (e.g., @rules/general.md), use your Read tool to load it on a need-to-know basis. They're relevant to the SPECIFIC task at hand.

## Development Guidelines

For TypeScript code style and best practices: @.github/typescript-instructions.md
For Documentation guidelines: @.github/documentation-instructions.md
For Git Commit Conventions: @.github/git-commit-instructions.md
