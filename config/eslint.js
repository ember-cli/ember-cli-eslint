'use strict';

module.exports = {
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "rules": {
    "prefer-arrow-callback": 0,
    "space-before-function-paren": [0, { "anonymous": "always", "named": "never" }],
    "object-curly-spacing": 0,
    "prefer-reflect": 0,
    "newline-after-var": 0,
    "arrow-spacing": 0,
    "array-callback-return": 0,
    "no-empty-function": 0,
    "prefer-rest-params": 0
  }
};
