# Ember-cli-eslint
![npm](https://img.shields.io/npm/v/ember-cli-eslint.svg)
[![Build Status](https://travis-ci.org/ember-cli/ember-cli-eslint.svg)](https://travis-ci.org/ember-cli/ember-cli-eslint)
![Package Status](https://david-dm.org/ember-cli/ember-cli-eslint.svg)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-eslint.svg)](https://emberobserver.com/addons/ember-cli-eslint)

ESLinting for Ember CLI apps, [ESLint](http://eslint.org/) provides a scriptable mechanism for checking applications against a strict set of rules.

## Basic setup

* `ember install ember-cli-eslint`
* This will create a `.eslintrc` file in your project directory setup with the correct parser.

## ESLint Babel

The [`babel-eslint`](https://github.com/babel/babel-eslint) parser will solve any new ECMA missing functionality in ESLint.

Due to an [issue that occurred as the result of changes across `eslint` and `babel-eslint`](https://github.com/babel/babel-eslint/issues/267), versions of `babel-eslint` less than `6.0.0-beta.6` will be incompatible with versions of `eslint` greater than or at `2.4.0` -- which this project relies on after `1.2.x`.

As such, it's recommended that you install `babel-eslint` at a version >= `6.0.0-beta.6`:

```
npm install --save-dev babel-eslint@6.0.0-beta.6
```

After installing, simply add the following option to your `eslint` configuration file:
```
    "parser": "babel-eslint",
```

## Disabling JSHint
Congratulations! You've made the leap into the next generation of JavaScript linting. At the moment, however, `ember-cli` defaults to generating applications and addons with a `jshint` configuration, and so you may initially notice the two awkwardly running side by side. Here are a few tips for handling this:

#### ember-cli >= 2.5.0
As of `ember-cli v.2.5.0`, [`jshint` is provided through its own `ember-cli-jshint` addon](https://github.com/ember-cli/ember-cli/pull/5757). Running `npm uninstall --save-dev ember-cli-jshint`, in addition to removing any `.jshintrc` files from your project should guarantee that its behavior is disabled.

#### ember-cli < 2.5.0
Controlling linting is a bit trickier on versions of `ember-cli` prior to `2.5.0`. Within your `ember-cli-build.js` file, `ember-cli-qunit` or `ember-cli-mocha` can be configured to have their default linting process disabled during:

```javascript
'ember-cli-qunit': {
  useLintTree: false
}
```
or
```javascript
'ember-cli-mocha': {
  useLintTree: false
}
```
Alongside this setting, the `hinting` property can then be used to enable/disable globally:

```javascript
hinting: !isTesting,  
```
Furthermore, a `.eslintignore` file can be used to exclude files from linting while the linter is running. Its syntax is identical to `.gitignore` files.


## Installation

* `ember install ember-cli-eslint`

## Configuration

ESLint will be run by `ember-cli-qunit` or `ember-cli-mocha` automatically; **no additional configuration is required**.  If ESLint is *not* being run automatically, try updating your `ember-cli` or `ember-cli-qunit`/`embe-cli-mocha` version.

If you want to customize the way the tests are generated for your test runner, you can define a `testGenerator` in the configuration options:

```javascript
// ember-cli-build.js
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

function eslintTestGenerator(relativePath, errors) {
  var testFormat = '....';  // Whatever the format for the tests in your framework is
  return testFormat;
}

var app = new EmberApp({
  eslint: {
    testGenerator: eslintTestGenerator
  }
});
```

for a more detailed example, you can find the implementation in `ember-cli-qunit` [here](https://github.com/ember-cli/ember-cli-qunit/blob/ba906cacc8674e7c0d6d8ed74223a284dcdebf94/index.js#L192-L203).

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
