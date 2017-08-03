'use strict';

/* eslint-env node */

module.exports = {
  name: 'ember-cli-eslint',

  // TODO: Disable this (or set it to return false) before committing
  isDevelopingAddon: function() {
    return false;
  },

  // instructs ember-cli-qunit and ember-cli-mocha to
  // disable their lintTree implementations (which use JSHint)
  isDefaultJSLinter: true,

  init() {
    this._super.init && this._super.init.apply(this, arguments);

    var VersionChecker = require('ember-cli-version-checker');
    var checker = new VersionChecker(this);

    if (checker.for('ember-cli-qunit', 'npm').satisfies('*')) {
      this._testGenerator = 'qunit';
    } else if (checker.for('ember-cli-mocha', 'npm').satisfies('*')) {
      this._testGenerator = 'mocha';
    }
  },

  included: function (app) {
    this._super.included.apply(this, arguments);
    this.options = app.options.eslint || {};
  },

  lintTree: function(type, tree) {
    var ui = this.ui;

    if (type === 'templates') {
      return undefined;
    }

    var ESLint = require('broccoli-lint-eslint');

    return ESLint.create(tree, {
      testGenerator: this.options.testGenerator || this._testGenerator,
      group: (this.options.group !== false) ? type : undefined,
      extensions: this.options.extensions,

      options: {
        rulesDir: this.options.rulesDir || 'eslint-rules'
      },

      options: this.options,

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
