# JavaScript / TypeScript Code Style

## Core Principles

When generating or reviewing code, follow these principles in order of priority:
1. **Functionality** - Code works as expected with good performance
2. **Readability** - Easy to read and understand
3. **Debuggability** - Easy to debug with clear breakpoint opportunities
4. **Maintainability** - Easy to maintain and change

## Naming Conventions

### Variables and Functions
- Use **camelCase** for variables, functions, and properties
- Use **whole words** - avoid abbreviations like `err`, `ctx`, `img`, `pos`
- Use **self-documenting names** that reflect meaning and semantics
- Be **explicit over implicit** - prefer `scenarioCount` over `count`
- Use **long names when needed** - `convertScenarioModulesToSandboxedModules` is fine

### Specific Naming Rules
- **Files**: Use `kebab-case` (e.g., `user-service.ts`)
- **Types/Classes**: Use `PascalCase`, no `I` prefix for interfaces
- **Enums**: Use `PascalCase` for values
- **Booleans**: Name as questions (`isRunning`, `shouldProcess`, `canExecute`)
- **Arrays**: Use plurals (`scenarios`, `users`) with count variables as `scenarioCount`
- **Objects/Maps**: Be descriptive (`scenarioById`, `usersByRole`)
- **Functions**: Use verbs (`getHeight`, `buildScenario`, `validateInput`)

### File System Variables
- `file` - file handle
- `path` - full path (`/etc/users/hello.txt`)
- `absolutePath`/`relativePath` - when distinction matters
- `basename`/`filename` - just the filename (`hello.txt`)
- `extension` - file extension (`txt` or `.txt`)
- `directory`/`folder` - directory path (be consistent)

### Include Units and Types
- Add units: `widthPx`, `priceUsd`, `timeInUtc`
- Distinguish types: `jsonString` vs `jsonObject`, `rawArray` vs `parsedArray`

## Code Structure

### Variables and Returns
```typescript
// Use variables for return values (better debugging)
function loadBlueprint(scenarioId: number) {
  const blueprint = database.findBlueprint(scenarioId)
  return blueprint
}

// Break up long chains for debugging
const scenarios = database.findScenariosForUser(userId)
const validScenarios = scenarios.filter(isValid)
const scenarioModules = validScenarios.map(extractScenarioModules)
```

### Conditionals
```typescript
// Extract complex conditions
const isAdult = user.age > 18
const isWorkingAge = user.age < 65
const isFamilyOrFriends = user.inGroup(FAMILY) || user.inGroup(FRIENDS)

if (isAdult && isWorkingAge && isFamilyOrFriends) {
  // ...
}

// Prefer positive conditions
if (isRunning) {
  doSomethingWhenRunning()
} else {
  doSomethingWhenNotRunning()
}

// Handle all cases explicitly
if (condition1) {
  // ...
} else if (condition2) {
  // ...
} else if (condition3) {
  // ...
} else {
  throw new Error('Unhandled case')
}
```

## TypeScript/JavaScript Specifics

### Variable Declarations
- Use `const` by default, `let` when reassignment needed
- Never use `var`
- Use `undefined`, never `null`

### Loops and Iteration
```typescript
// Prefer for..of over forEach
for (const item of items) {
  // Can use break/continue, better TypeScript support
}

// Use entries for index access
for (const [index, value] of items.entries()) {
  console.log(`${index}: ${value}`)
}

// Avoid for..in loops
// Use Object.keys() or Object.entries() instead
```

### Operators and Syntax
- Use `===` and `!==`, never `==` or `!=`
- Use single quotes for strings
- Use template strings over concatenation
- Use `node:` protocol for Node.js imports: `import fs from 'node:fs'`
- Limit nested ternary operators

## Comments

### Comment Guidelines
```typescript
// Comments explain "why", not "what"
// users historically expect the dropdown to collapse
// after three seconds of inactivity
setTimeout(() => {}, 3000)

// Place comments above code, not inline
// This is preferred
const result = processData()

// Use TODO and NOTE comments with names
// TODO(username): Optimize this algorithm for better performance
// NOTE(username): This workaround is needed due to upstream API bug
```

### JSDoc for Public APIs
Use JSDoc style comments for functions, interfaces, enums, and classes that are exported.

[Documentation Instructions](documentation-instructions.md)

## Functional Programming Patterns

### Pure Functions
- Write side-effect-free functions when possible
- Move side effects up in the call hierarchy
- Functions should only depend on parameters and return values

### Immutability
- Don't reassign variables when possible
- Treat objects and arrays as immutable after creation
- Use destructuring instead of `delete` for object properties

## Error Handling

### Defensive Programming
- Use assertions to verify invariants
- Distinguish expected vs unexpected errors
- Handle expected errors with return values
- Handle unexpected errors with exceptions

## File Organization

### Structure
- 1 file per logical component
- Don't hand-edit `.generated.*` files
- Types shared across components go in `types.ts`
- Type definitions should come before usage

### Exports
- Only export types/functions that need to be shared
- Don't pollute global namespace
- Keep internal implementation details private

## Constructs to Avoid

- `==` and `!=` operators
- `.forEach()` on arrays (use `for..of`)
- `for..in` statements
- Excessive method chaining
- `delete` operator on objects
- `eval` or `Function()` for string-to-code conversion
- Classes (prefer functions and closures)
- Negated conditions in if statements

## When to Break Guidelines

These guidelines are not absolute. Break them when:
- You have a good technical reason
- Performance requirements demand it
- Interfacing with external systems requires different conventions
- The code becomes significantly more complex following the guidelines

Always be prepared to explain your reasoning in code reviews.