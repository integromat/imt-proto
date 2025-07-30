# Conventional Commit Instructions for GitHub Copilot

When generating commit messages, follow the Conventional Commits specification based on Angular conventions:

## Commit Message Format

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

## Rules

- **Header is mandatory**, scope is optional
- **Maximum 100 characters per line** for better readability
- **Footer should contain Jira issue reference** when applicable

## Type

Must be one of the following:

- `build`: Changes affecting build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `docs`: Documentation only changes
- `feat`: A new feature (requires Jira issue in body/footer)
- `fix`: A bug fix (requires Jira issue in body/footer)
- `perf`: Code change that improves performance
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `style`: Changes that don't affect code meaning (whitespace, formatting, etc.)
- `wip`: Commit with incomplete changes

**Note**: Types marked with * (`feat`, `fix`) must include Jira issue reference in commit body/footer for main branches.

## Scope

- Use noun describing codebase section in parentheses: `fix(parser):`
- Scope is arbitrary by default
- Can be enforced to specific values if configured

## Subject

- Use **imperative, present tense**: "change" not "changed" or "changes"
- **Don't capitalize** first letter
- **No dot** at the end
- Keep it succinct and descriptive

## Body

- Use **imperative, present tense**
- Include **motivation for change**
- **Contrast with previous behavior**
- Reference issues this commit closes

## Footer

Include any of these special sections:

- **Breaking Changes**: Start with `BREAKING CHANGE:` followed by description
- **Dependencies**: Start with `DEPS:`
- **Rollback Instructions**: Start with `ROLLBACK:`
- **Server Configuration**: Start with `CONFIG:`
- **Jira Issue**: Reference format like `CDM-1234`

## Examples

**Simple fix:**
```
fix(release): need to depend on latest rxjs and zone.js

CDM-392
```

**Feature with breaking change:**
```
feat(compile): simplify isolate scope bindings

CDM-1234

BREAKING CHANGE: isolate scope bindings definition has changed and
the inject option for the directive controller injection was removed.
```

**Documentation update:**
```
docs(guide): updated fixed docs from Google Docs

Couple of typos fixed:
- indentation
- batchLog -> batchLog  
- start periodic checking
- missing brace
```

**Work in progress:**
```
wip(auth): implementing new login flow

Still working on OAuth integration
```

## Revert Commits

For reverts, begin with `revert:` followed by the header of reverted commit:

```
revert: feat(compile): simplify isolate scope bindings

This reverts commit <hash>.
```