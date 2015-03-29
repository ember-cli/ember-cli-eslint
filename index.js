/* jshint node: true */
'use strict';
var eslint = require('broccoli-lint-eslint');

module.exports = {
  name: 'ember-cli-eslint',
  included: function (app) {
    this._super.included(app);
    this.jshintrc = app.options.jshintrc;
  },
  lintTree: function(type, tree) {
    return eslint(tree, {
      config: this.jshintrc.app + '/eslint.json',
      rulesdir: this.jshintrc.app
    });
  }
};
