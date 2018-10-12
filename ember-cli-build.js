/* eslint-env node */
'use strict';
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function (defaults) {
  var options = {
    eslint: {},
  };

  if (process.env['NO_GROUPING']) {
    options.eslint.group = false;
  }

  if (process.env['JSX']) {
    options.eslint.extensions = ['js', 'jsx'];
  }

  var app = new EmberAddon(defaults, options);

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
