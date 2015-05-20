'use strict';
var eslint = require('broccoli-lint-eslint');

module.exports = {
  name: 'ember-cli-eslint',
  included: function (app) {
    this._super.included(app);
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
