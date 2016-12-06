/*eslint-env node*/

'use strict';

var Builder = require('broccoli-builder').Builder;
var reject = require('rsvp').reject;
var Funnel = require('broccoli-funnel');
var eslint = require('broccoli-lint-eslint');

function runLint() {
  var ui = this.ui;
  var hadError = false;

  var tree = new Funnel(this.project.root, {
    include: [
      'addon/**/*.js',
      'app/**/*.js',
      'tests/**/*.js'
    ]
  });
  var eslintTree = eslint(tree, {
    console: {
      log: function(message) {
        ui.writeLine(message);
      },
      error: function(message) {
        hadError = true;
        ui.writeLine(message, 'ERROR');
      }
    }
  });
  var builder = new Builder(eslintTree);

  return builder.build().then(function() {
    if (hadError) {
      return reject();
    }
  });
}

module.exports = runLint;
