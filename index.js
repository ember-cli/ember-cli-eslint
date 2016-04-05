'use strict';
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

  lintTree: function(type, tree) {
    var project = this.project;

    if (type === 'templates') {
      return;
    }

    return eslint(tree, {
      testGenerator: this.options.testGenerator || function(relativePath, errors) {
        if (!project.generateTestFile) {
          // Empty test generator. The reason we do that is that `lintTree`
          // will merge the returned tree with the `tests` directory anyway,
          // so we minimize the damage by returning empty files instead of
          // duplicating app tree.
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
