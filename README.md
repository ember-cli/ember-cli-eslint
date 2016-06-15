# Ember-cli-eslint
![npm](https://img.shields.io/npm/v/ember-cli-eslint.svg)
[![Build Status](https://travis-ci.org/ember-cli/ember-cli-eslint.svg)](https://travis-ci.org/ember-cli/ember-cli-eslint)
![Package Status](https://david-dm.org/ember-cli/ember-cli-eslint.svg)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-eslint.svg)](https://emberobserver.com/addons/ember-cli-eslint)

ESLinting for Ember CLI apps, [ESLint](http://eslint.org/) provides a scriptable mechanism for checking applications against a strict set of rules.

## Basic setup

```
ember install ember-cli-eslint
```

This will create a `.eslintrc.js` file in the root of your project, and another `.eslintrc.js` file inside of `/test`. These files extend from our recommended configurations for [Ember application code](/coding-standard/ember-application.js) and [Ember testing code](/coding-standard/ember-testing.js), respectively. However, starting from scratch is as easy as deleting the `extends` declaration and [writing your own configuration rules as usual](http://eslint.org/docs/user-guide/configuring).

## Disabling JSHint
Congratulations! You've made the leap into the next generation of JavaScript linting. At the moment, however, `ember-cli` defaults to generating applications and addons with a `jshint` configuration, and so you may initially notice the two awkwardly running side by side. Here are a few tips for handling this:

#### ember-cli >= 2.5.0
As of `ember-cli v.2.5.0`, [`jshint` is provided through its own `ember-cli-jshint` addon](https://github.com/ember-cli/ember-cli/pull/5757). Running `npm uninstall --save-dev ember-cli-jshint`, in addition to removing any `.jshintrc` files from your project should guarantee that its behavior is disabled.

#### ember-cli < 2.5.0
Controlling linting is a bit trickier on versions of `ember-cli` prior to `2.5.0`. Within your `ember-cli-build.js` file, `ember-cli-qunit` or `ember-cli-mocha` can be configured to have their default linting process disabled during:

```javascript

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    'ember-cli-qunit': {
      useLintTree: false
    }
  });
};

```
or
```javascript
module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    'ember-cli-mocha': {
      useLintTree: false
    }
  });
};
```
Alongside this setting, the `hinting` property can then be used to enable/disable globally:

```javascript
const isTesting = process.env.EMBER_ENV === 'test';

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    hinting: !isTesting,
  });
};
```
Furthermore, a `.eslintignore` file can be used to exclude files from linting while the linter is running. Its syntax is identical to `.gitignore` files.


## Configuration

ESLint will be run by `ember-cli-qunit` or `ember-cli-mocha` automatically; **no additional configuration is required**.  If ESLint is *not* being run automatically, try updating your `ember-cli` or `ember-cli-qunit`/`embe-cli-mocha` version.

If you want to customize the way the tests are generated for your test runner, you can define a `testGenerator` in the configuration options:

```javascript
// ember-cli-build.js
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

function eslintTestGenerator(relativePath, errors) {
  const testFormat = '....';  // Whatever the format for the tests in your framework is
  return testFormat;
}

const app = new EmberApp({
  eslint: {
    testGenerator: eslintTestGenerator
  }
});
```

for a more detailed example, you can find the implementation in `ember-cli-qunit` [here](https://github.com/ember-cli/ember-cli-qunit/blob/ba906cacc8674e7c0d6d8ed74223a284dcdebf94/index.js#L192-L203).


## Contributing

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).


## License

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
