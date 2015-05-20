# Ember-cli-eslint [![Build Status](https://travis-ci.org/jonathanKingston/ember-cli-eslint.svg)](https://travis-ci.org/jonathanKingston/ember-cli-eslint) ![Package Status](https://david-dm.org/jonathanKingston/ember-cli-eslint.svg)

ESLinting for Ember CLI apps, [ESLint](http://eslint.org/) provides a scriptable mechanism for checking applications against a strict set of rules.

## Basic setup

* `ember install ember-cli-eslint`
* This will create a `.eslintrc` file in your project directory setup with the correct parser.

## ESLint Babel

babel-eslint parser will solve any new ECMA missing functionality in ESLint.

Adding the following to your parser after installing will solve this issue:
```
    "parser": "babel-eslint",
```

## Installation

* `ember install ember-cli-eslint`

## Adding a Test Generator

You may want to generate tests that pass/fail based on the eslint result.

You can pass a `testGenerator` function to `EmberApp`. Use the `eslint` option.

Example:

```javascript
// Brocfile.js

var path = require('path');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
// `npm install --save-dev js-string-escape`
var jsStringEscape = require('js-string-escape');

var app = new EmberApp({
  eslint: {
    testGenerator: eslintTestGenerator
  }
});

function render(errors) {
  if (!errors) { return ''; };
  return errors.map(function(error) {
    return error.line + ':' + error.column + ' ' +
      ' - ' + error.message + ' (' + error.ruleId +')';
  }).join('\n');
}

// Qunit test generator
function eslintTestGenerator(relativePath, errors) {
  var pass = !errors || errors.length === 0;
  return "import { module, test } from 'qunit';\n" +
    "module('ESLint - " + path.dirname(relativePath) + "');\n" +
    "test('" + relativePath + " should pass ESLint', function(assert) {\n" +
    "  assert.ok(" + pass + ", '" + relativePath + " should pass ESLint." +
    jsStringEscape("\n" + render(errors)) + "');\n" +
   "});\n";
}

// Mocha test generator
function eslintTestGenerator(relativePath, errors) {
  var pass = !errors || errors.length === 0;
  return "import { describe, it } from 'mocha';\n" +
    "import { assert } from 'chai';\n" +
    "describe('ESLint - " + path.dirname(relativePath) + "', function() {\n" +
    "  it('" + relativePath + " should pass ESLint', function() {\n" +
    "    assert.ok(" + pass + ", '" + relativePath + " should pass ESLint." +
    jsStringEscape("\n" + render(errors)) + "');\n" +
   "  });\n});\n";
}

```

## Running tests

```
npm install -g phantomjs;
ember test
```

The tests are using the dummy app to output tests.

## Licence

The MIT License (MIT)

Copyright (c) 2015 Jonathan Kingston

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
