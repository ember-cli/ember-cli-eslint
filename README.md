# Ember-cli-eslint

Initial work for supporting eslinting ember.

As current ember setups require modules, eslint doesn't have the native support we need yet:
- Requires: https://github.com/eslint/espree/pull/43

However to use, babel-eslint parser can solve this.

Adding the following to your parser after installing will solve this issue:
```
    "parser": "babel-eslint",
```


## Installation

* `ember install:addon ember-cli-eslint`

