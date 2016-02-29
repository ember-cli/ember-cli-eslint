# Ember-cli-eslint [![Build Status](https://travis-ci.org/jonathanKingston/ember-cli-eslint.svg)](https://travis-ci.org/jonathanKingston/ember-cli-eslint) ![Package Status](https://david-dm.org/jonathanKingston/ember-cli-eslint.svg)

ESLinting for Ember CLI apps, [ESLint](http://eslint.org/) provides a scriptable mechanism for checking applications against a strict set of rules.

## Basic setup

* `ember install ember-cli-eslint`
* This will create a `.eslintrc` file in your project directory setup with the correct parser.

## ESLint Babel

babel-eslint parser will solve any new ECMA missing functionality in ESLint.

Adding the following to your .eslintrc file after installing will solve this issue:

```
    "parser": "babel-eslint",
```

## Installation

* `ember install ember-cli-eslint`

## Adding a Test Generator

You may want to generate tests that pass or fail based on the ESLint result.

You can pass a `testGenerator` function to `EmberApp` via the `eslint` option.
Ember-cli-eslint offers two such test generators out of the box: `qunit` and
`mocha`.

Example:

```javascript
// ember-cli-build.js (or Brocfile.js on older versions of ember-cli)

var path = require('path');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var testGenerators = require('ember-cli-eslint/test-generators');

var app = new EmberApp({
  eslint: {
    testGenerator: testGenerators.qunit // or testGenerators.mocha
  }
});
```

You can also write your own `testGenerator` function. See
[test-generators.js](test-generators.js) for help getting starting with that.

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
