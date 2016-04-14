# 1.3.0 / 13-04-2016
- `broccoli-lint-eslint@^2.0.0`
- Passing build
- Move local `eslint` config settings to `config` directory.
- Update version of `eslint-config-ember` installed by default blueprint to `0.3.0`.
- Update project to `ember-cli@2.3.0`.
- Implement `lintTree` function that calls `project.generateTestFile` -- if it's available.
- Disable `ember-cli-qunit`'s and `ember-cli-mocha`'s' lintTree hook.

# 1.2.1
- Updated to eslint@1.4.1
  - eslint-config-ember@0.1.1
  - broccoli-lint-eslint@1.1.1

# 1.2.0
- Updated to eslint@1.1.3

# 1.1.0
- Upgrading package dependencies for Ember 1.13.8

# 1.0.0
- Bumping package to publish beta to stable

# 1.0.0-beta.15
- Bumping package because npm broke index.js again

# 1.0.0-beta.14
- Bumping version for broccoli-lint-eslint and eslint-config-ember

# 1.0.0-beta.13
- Adding tmp to .npmignore

# 1.0.0-beta.12
- Upgrade broccoli-lint-eslint to 1.0.0

# 1.0.0-beta.11
- Bump package number, again

# 1.0.0-beta.10
- Update badges
- Update package call

# 1.0.0-beta.9
- Force change due to npm index.js issue
- Add badge for travis

# 1.0.0-beta.8
- Fixing linting errors for dummy app
- Moving to package install in ember blueprint

# 1.0.0-beta.7
- Remove dirs and files that are not required
- Fix testing .eslintrc blueprint file
- Consume native eslint-config-eslint for own linting
- Move afterInstall to blueprint
- Upgrade to eslint-config-ember@0.0.5
- Add .gitkeep to blueprint to be usable as an addon

# 1.0.0-beta.2
- Update blueprint to use eslint-config-ember

# 0.1.4

- Updating documentation
- Updating broccoli-lint-eslint to 0.1.3

# 0.1.3

- Removing default eslint.json to allow ESLint to use default config lookup
- Moved the generator to use .eslintrc
- Updating broccoli-lint-eslint to 0.1.2
