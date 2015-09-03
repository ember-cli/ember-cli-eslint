/* jshint node: true */
/* global require, module */
var path = require('path');
var jsStringEscape = require('js-string-escape');
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function (defaults) {
  var app = new EmberAddon({
    eslint: {
      testGenerator: eslintTestGenerator
    }
  });


  function render(errors) {
    if (!errors) {
      return '';
    }
    return errors.map(function (error) {
      return error.line + ':' + error.column + ' ' +
        ' - ' + error.message + ' (' + error.ruleId + ')';
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

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
