/*eslint-env node*/

'use strict';

var Builder = require('broccoli').Builder;
var Funnel = require('broccoli-funnel');
var eslint = require('broccoli-lint-eslint');

function runLint() {
  var tree = new Funnel(this.project.root, {
    include: [
      'app/**/*.js',
      'tests/**/*.js'
    ]
  });
  var eslintTree = eslint(tree, {
    throwOnError: true
  });
  var builder = new Builder(eslintTree);

  return builder.build();
}

module.exports = runLint;
