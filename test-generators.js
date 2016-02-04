/* jshint node: true */
/* global require, module */
var path = require('path');
var jsStringEscape = require('js-string-escape');

module.exports = {
  qunit: qunitTestGenerator,
  mocha: mochaTestGenerator
};

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
function qunitTestGenerator(relativePath, errors) {
  var pass = !errors || errors.length === 0;
  return "import { module, test } from 'qunit';\n" +
    "module('ESLint - " + path.dirname(relativePath) + "');\n" +
    "test('" + relativePath + " should pass ESLint', function(assert) {\n" +
    "  assert.expect(1);\n  assert.ok(" + pass + ", '" + relativePath +
    " should pass ESLint." + jsStringEscape("\n" + render(errors)) + "');\n" +
    "});\n";
}

// Mocha test generator
function mochaTestGenerator(relativePath, errors) {
  var pass = !errors || errors.length === 0;
  return "import { describe, it } from 'mocha';\n" +
    "import { assert } from 'chai';\n" +
    "describe('ESLint - " + path.dirname(relativePath) + "', function() {\n" +
    "  it('" + relativePath + " should pass ESLint', function() {\n" +
    "    assert.ok(" + pass + ", '" + relativePath + " should pass ESLint." +
    jsStringEscape("\n" + render(errors)) + "');\n" +
    "  });\n});\n";
}
