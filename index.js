'use strict';

module.exports = {
  name: 'ember-cli-eslint',

  // TODO: Disable this (or set it to return false) before committing
  isDevelopingAddon: function() {
    return false;
  },

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
    var ui = this.ui;

    if (type === 'templates') {
      return undefined;
    }

    var eslint = require('broccoli-lint-eslint');
    var jsStringEscape = require('js-string-escape');

    return eslint(tree, {
      testGenerator: this.options.testGenerator || function(relativePath, errors, results) {
        if (!project.generateTestFile) {
          // Empty test generator. The reason we do that is that `lintTree`
          // will merge the returned tree with the `tests` directory anyway,
          // so we minimize the damage by returning empty files instead of
          // duplicating app tree.
          return '';
        }

        var passed, messages;
        if (results) {
          passed = !results.errorCount || results.errorCount.length === 0;

          messages = '';
          if (results.messages) {
            messages = jsStringEscape('\n' + render(results.messages));
          }
        } else {
          // backwards compat support for broccoli-lint-eslint versions
          // 2.3.0 and older...
          passed = !errors || errors.length === 0;

          if (errors) {
            messages = jsStringEscape('\n' + render(errors));
          }
        }

        return project.generateTestFile('ESLint - ' + relativePath, [{
          name: 'should pass ESLint',
          passed: passed,
          errorMessage: relativePath + ' should pass ESLint.' + messages
        }]);
      },

      console: {
        log: function(message) {
          ui.writeLine(message);
        },

        error: function(message) {
          ui.writeLine(message, 'ERROR');
        }
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
