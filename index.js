'use strict';
var path = require('path');
var resolve = require('resolve');
var eslint = require('broccoli-lint-eslint');
var jsStringEscape = require('js-string-escape');

module.exports = {
  name: 'ember-cli-eslint',

  // instructs ember-cli-qunit and ember-cli-mocha to
  // disable their lintTree implementations (which use JSHint)
  isDefaultJSLinter: true,

  included: function (app) {
    this._super.included.apply(this, arguments);
    this.jshintrc = app.options.jshintrc;
    this.options = app.options.eslint || {};
  },

  lintTree: function(type, node) {
    var project = this.project;

    if (type === 'templates') {
      return;
    }

    var broccolLintESLintRoot = path.dirname(resolve.sync('broccoli-lint-eslint'));
    var babelESLintDir = path.dirname(resolve.sync('babel-eslint', { basedir: broccolLintESLintRoot }));

    return eslint(node, {

      // Find broccoli-lint-eslint's babel-eslint parser and use it as our default
      options: {
        parser: babelESLintDir
      },

      testGenerator: this.options.testGenerator || function(relativePath, errors) {
        if (!project.generateTestFile) {
          // Empty test generator. The reason we do that is that `lintTree`
          // will merge the returned node with the `tests` directory anyway,
          // so we minimize the damage by returning empty files instead of
          // duplicating app node.
          return '';
        }

        var passed = !errors || errors.length === 0;

        if (errors) {
          errors = jsStringEscape('\n' + render(errors));
        }

        return project.generateTestFile('ESLint - ' + relativePath, [{
          name: 'should pass ESLint',
          passed: passed,
          errorMessage: relativePath + ' should pass ESLint.' + errors
        }]);
      }
    });
  }
};

function render(errors) {
  return errors.map(function(error) {
    return error.line + ':' + error.column + ' ' +
      ' - ' + error.message + ' (' + error.ruleId +')';
  }).join('\n');
}
