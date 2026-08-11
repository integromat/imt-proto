# @integromat/proto — Agent Context

## What

TypeScript library of abstract base classes ("proto-classes") that define the contract between the Make/Integromat engine and native app integration modules. Published as `@integromat/proto` on npm.

**Tech stack**: TypeScript, Node.js ≥24, Vitest (SWC transform, `globals: true`), Oxlint (type-aware) + Oxfmt.

## Why / Domain Concepts

Every node type in a Make scenario (triggers, actions, transformers, etc.) must extend the corresponding proto-class. The engine instantiates these classes, calls their lifecycle methods, and listens to events they emit.

**Module type hierarchy** — all extend `IMTBase` (EventEmitter):

- `IMTTrigger` → override `read(done)` and `fetch(id, done)`
- `IMTAction` → override `write(bundle, done)`
- `IMTTransformer` → override `transform(bundle, done)`
- `IMTAggregator`, `IMTFeeder` → extend Transformer; Feeder provides default `transform` that flattens `bundle.array`
- `IMTListener` → override `start(done)` / `stop(done)`
- `IMTRouter`, `IMTConverger` — marker classes, no override needed
- `IMTReturner` → override `returnData(bundle, done)`
- `IMTStarter` → override `start(done)`
- `IMTAgent` → Promise-based; override `getNextAction(params, resources): Promise<Action>`

**Standalone classes** (do not extend `IMTBase`):

- `IMTRPC` (EventEmitter) — dynamic data lookup; override `execute(done)`
- `IMTHook` (EventEmitter) — webhook handler; override `parse(request, done)`
- `IMTAccount` / `IMTOAuthAccount` (no EventEmitter) — connection auth; OAuth subclass adds full auth flow
- `IMTEndpoint` (EventEmitter) — Endpoints' base class; override `execute(input, done)`. Replaces the
  compiled-as-`IMTRPC` shortcut Endpoints used previously — `instanceof IMTRPC` is deliberately `false`

**Key patterns**:

- All module methods use Node-style `(err?, result?, metadata?)` callbacks — except `IMTAgent` which uses Promises
- `log/warn/debug/audit` on `IMTBase` emit named events (`'log'`, `'warn'`, `'debug'`, `'audit'`) — the engine subscribes to these; they do not write anywhere directly
- `ModuleType` enum in `src/base.ts` assigns integer IDs to each module kind (0–15, with gaps at 13/16 left by removed types); same integers mirrored as static constants on `IMTBase` (e.g., `IMTBase.MODULETYPE_ACTION`)
- Gateway variants (`IMTGatewayTrigger`, `IMTGatewayAction`, `IMTGatewayResponder`) are empty type-marker subclasses
- `finalize()` always calls `removeAllListeners()`; commit/rollback default to no-ops

**Error semantics** — each error class triggers distinct engine behavior:

- `DataError` → bundle to DLQ, scenario commits
- `RuntimeError` → triggers rollback
- `InconsistencyError` → stops immediately
- `RateLimitError` / `IncompleteDataError` → has `delay` ms field; freezes scenario
- `InvalidConfigurationError` / `InvalidAccessTokenError` → disables scenario
- `UnexpectedError` → locks scenario for staff review
- All error classes use `Object.setPrototypeOf` for correct `instanceof`; `Error.prototype.toJSON` and `hash`/`imtExceptionHash` are monkey-patched globally in `src/error.ts`

**`IMTAgent` action types** (discriminated union in `src/agent.ts`):

- `UseToolAction` — `{ type: 'useToolAction', selectedTool: { id, input }, context, reasoning?, content? }`
- `FinishAction` — `{ type: 'finishAction', status: 'SUCCESS'|'ERROR', outputBundle|error, metadata? }`
- `NextActionParams` — `InitialActionResult` (first call, has `inputBundle`) or `PreviousActionResult` (subsequent, has `previousAction: UseToolAction`)

**`./global` entry** (`src/global.ts`):

- Side-effect import; guards with `global.IMT_PROTO_LOADED` to prevent double-init
- Assigns all exported classes onto Node's `global` object for legacy CoffeeScript/non-module consumers
- Also side-effect-imports `src/compatibility-extensions.ts`, which monkey-patches `Function.prototype` with `.inherits()` and `.property()` — this file is intentionally NOT re-exported from `src/index.ts`
- `global.requireCommon` is set to a no-op stub here; the real implementation is injected by the engine at runtime

**`MetadataList`** (`src/types.ts`) — `Array<Metadata>` where each entry is either a `Link` (points to execution/scenario) or `Centicredits` (AI cost tracking). Passed as third arg to `DoneWithResultCallback`.

## How

Source in `src/` (flat, 25 files). Tests in `test/` (flat, 8 files). Build output in `dist/` (not in git).

**Package manager**: pnpm (pinned via `packageManager` field; enable with `corepack enable`). Install with `pnpm install --frozen-lockfile`. Lockfile is `pnpm-lock.yaml`.

**Build**: `pnpm build` — `rm -rf dist`, then two emitters into `dist/`: (1) `swc src --out-dir dist --strip-leading-paths` compiles the runtime JS to ES5 CommonJS + `.js.map` (config in `.swcrc`); (2) `tsc -p tsconfig.lib.json` emits declarations only (`emitDeclarationOnly`) → `.d.ts` + `.d.ts.map`. SWC owns the ES5 lowering because TypeScript 7 removed the `target: ES5` / `moduleResolution: node10` options this lib relies on (ES5 emit is required for the legacy CoffeeScript compat tests). `tsc` no longer emits JS — it only type-checks and produces types.

**Test**: `pnpm test` — runs Oxlint then Vitest. Unit tests only: `pnpm test:unit` (`vitest run --coverage`). Config in `vitest.config.ts`: SWC transform targets ES5 (esbuild can't lower `class` to ES5, which the legacy CoffeeScript compat tests require) via an **inline** `unplugin-swc` config with `swcrc: false` — it deliberately ignores the repo `.swcrc` (whose `module: commonjs` would rewrite test imports to `require()` that Vite's resolver can't follow); Vite keeps ownership of module resolution. Also `globals: true` (no `describe`/`it`/`expect` imports), v8 coverage to `coverage/unit`, junit report to `junit.xml`. Callback-style tests wrap the body in `new Promise` with a local `done` shim — Vitest 3 dropped the `done` test-callback param.

**Lint/format**: `pnpm lint` (Oxlint, type-aware via `oxlint-tsgolint`; config in `.oxlintrc.json`), `pnpm format:check` / `pnpm format` (Oxfmt; config in `.oxfmtrc.json`). Type-aware linting reads the root `tsconfig.json` (ES2022/Node16, includes src+test+config JS).

**Two tsconfigs** (both ES2022/Node16 now — no ES5, since SWC handles ES5 emit and TS7 dropped the option): root `tsconfig.json` is the type-check/editor/lint base (includes src+test+config JS, `node`+`vitest/globals` types; auto-discovered by Oxlint's type-aware pass and used by the editor — nothing runs `tsc` against it). `tsconfig.lib.json` extends root and drives the declaration build (includes `src/` only, `emitDeclarationOnly`, `allowJs: false`, `node`-only types, excludes `*.spec.ts` — produces the published `.d.ts`; inherits `declaration`/`declarationMap`/`outDir` from root).

**Test pattern**: each spec creates an inline concrete subclass, exercises the full lifecycle (`initialize → operation → commit/rollback → finalize`), and asserts with a mix of Node `assert` and Vitest `expect`. Shared callback/event helpers live in `test/helpers.ts` (`run` wraps a Node-style callback method into a Promise that resolves with its result; `onceEvent` resolves with the payload of a single named event) — not a spec file, so Vitest ignores it. No other shared fixtures.

**Two package entry points**:

- `.` → `dist/index.js` — standard module import
- `./global` → `dist/global.js` — legacy global injection (side-effect only)

## When in Plan Mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- Interview user in detail (for Claude: use the AskUserQuestionTool) about literally anything: technical implementation, UI & UX, concerns, tradeoffs, etc. but make sure the questions are not obvious. Be very in-depth and continue interviewing the user continually until it's complete. Use the answers to create a detailed spec.
- Make assumptions explicit: When you must proceed under uncertainty, list assumptions up front and continue.
