
## ember-cli-eslint

Usage
------------------------------------------------------------------------------

ESLint will be run by `ember-cli-qunit` or `ember-cli-mocha` automatically
when you run `ember test`.  If ESLint is *not* being run automatically, try
updating your `ember-cli` and/or `ember-cli-qunit`/`ember-cli-mocha`
dependencies.


### Configuration

`ember-cli-eslint` can be configured through the `eslint` key in your
`ember-cli-build.js` file:

```js
let app = new EmberApp(defaults, {
  eslint: {
    testGenerator: 'qunit',
    group: true,
    rulesDir: 'eslint-rules',
    extensions: ['js'],
  }
});
```

- `testGenerator` is automatically detected if `ember-qunit`/`ember-cli-qunit`
  or `ember-mocha`/`ember-cli-mocha` are used, but can also be set to `qunit`
  and `mocha` manually.

- `group` can be set to `false` to go back to the previous behavior where
  every generated test was contained in its own separate module.

- `rulesDir` is the name of the directory for your custom eslint rules.
  It defaults to `eslint-rules`.

- `extensions` is an array containing the file extensions to lint. If you want to lint JavaScript and TypeScript files for example it should be set to `['js', 'ts']`. _NOTE_: If you add Typescript files `typescript-eslint-parser` has to be installed and specified as the parser. For more information take a look at the [`typescript-eslint-parser`](https://github.com/eslint/typescript-eslint-parser)

### On Build Files

Please note that if you are using this to lint files which are part of the build
process (ie. index.js, ember-cli-build.js, config/), whether in an application or
as part of an addon, they will not be linted. It is recommended that `eslint` is
setup separately to lint these files and can be setup as an npm script and run as
part of a CI process.


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone` this repository
* `cd ember-cli-eslint`
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`
* `ember try:each`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`


### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
