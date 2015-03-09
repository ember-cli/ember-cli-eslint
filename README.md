# Ember-cli-eslint

ESLinting for Ember CLI apps, [ESLint](http://eslint.org/) provides a scriptable mechanism for checking applications against a strict set of rules.

## Basic setup

* `ember install:addon ember-cli-eslint`
* This will create a `eslint.json` file in your project directory setup with the correct parser.

## Native ESLint support

As current Ember setups require modules, ESLint doesn't have the native support we need yet:
- Requires: https://github.com/eslint/espree/pull/43

## ESLint Babel

However to use, babel-eslint parser will solve the missing functionality in ESLint.

Adding the following to your parser after installing will solve this issue:
```
    "parser": "babel-eslint",
```

## Installation

* `ember install:addon ember-cli-eslint`

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
