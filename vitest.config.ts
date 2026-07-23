import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // SWC transform (target ES5) replaces Vitest's default esbuild, which cannot
  // lower `class` to ES5. The published lib ships ES5, and the legacy
  // CoffeeScript compat tests invoke super-constructors as plain functions —
  // only ES5-compiled classes support that.
  //
  // swcrc:false — ignore the repo's `.swcrc` (that file drives the `swc` CLI
  // build and sets `module: commonjs`, which would rewrite test imports to
  // require() calls Vite's resolver can't follow). Tests use only this inline
  // config; Vite keeps ownership of module resolution.
  plugins: [
    swc.vite({
      swcrc: false,
      jsc: {
        target: 'es5',
        parser: { syntax: 'typescript', decorators: true },
        transform: { legacyDecorator: true, decoratorMetadata: true },
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'node',
    include: ['test/**/*.{spec,test}.ts'],
    reporters: ['default', ['junit', { outputFile: 'coverage/unit/junit.xml' }]],
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      reportsDirectory: 'coverage/unit',
      reporter: ['text', 'text-summary', 'lcov'],
      thresholds: {
        branches: 0,
        functions: 0,
        lines: 0,
        statements: 0,
      },
    },
  },
});
