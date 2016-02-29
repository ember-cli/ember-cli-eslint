'use strict';
var eslint = require('broccoli-lint-eslint');

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
    return eslint(tree, {
      testGenerator: this.options.testGenerator || generateEmptyTest
    });
  }
};

// Empty test generator. The reason we do that is that `lintTree`
// will merge the returned tree with the `tests` directory anyway,
// so we minimize the damage by returning empty files instead of
// duplicating app tree.
function generateEmptyTest() {
  return '';
}
