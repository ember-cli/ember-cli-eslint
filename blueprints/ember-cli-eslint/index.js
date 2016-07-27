/*eslint-env node*/

var unlink = require('fs').unlink;
var resolve = require('path').resolve;

var walkSync = require('walk-sync');

/**
 * For each item in the array, call the callback, passing the item as the argument.
 * However, only call the next callback after the promise returned by the previous
 * one has resolved.
 *
 * @param {*[]} items the elements to iterate over
 * @param {Function} cb called for each item, with the item as the parameter. Should return a promise
 * @return {Promise}
 */
function synchronize(items, cb) {
  return items.reduce(function(promise, item) {
    return promise.then(function() {
      return cb.call(this, item);
    });
  }, Promise.resolve());
}

module.exports = {
  name: 'ember-cli-eslint',

  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    var removeJSHintConfig = this._removeJSHintConfig.bind(this);

    if (!this.removePackageFromProject) {
      return;
    }

    return this.removePackageFromProject('ember-cli-jshint').then(function() {
      return removeJSHintConfig();
    });
  },

  /**
   * Fine JSHint configuration files and offer to remove them
   *
   * @return {Promise}
   */
  _removeJSHintConfig: function() {
    var promptRemove = this._promptRemove.bind(this);

    return this._findJSHintConfigFiles()
      .then(function(files) {
        return synchronize(files, function(fileName) {
          return promptRemove(fileName);
        });
      });
  },

  /**
   * Find JSHint configuration files
   *
   * @return {Promise->string[]} found file names
   */
  _findJSHintConfigFiles: function() {
    var projectRoot = this.project.root;
    var ui = this.ui;

    ui.startProgress('Searching for JSHint config files');
    return new Promise(function(resolve) {
      var files = walkSync(projectRoot, {
        globs: ['**/.jshintrc'],
        ignore: [
          'bower_components',
          'dist',
          'node_modules',
          'tmp'
        ]
      });

      ui.stopProgress();
      resolve(files);
    });
  },

  /**
   * Prompt the user about whether or not they want to remove the given file
   *
   * @param {string} filePath the path to the file
   * @return {Promise}
   */
  _promptRemove: function(filePath) {
    var removeFile = this._removeFile.bind(this);
    var message = 'I found a JSHint config file at ' + filePath + '\n  Do you want to remove it?';

    var promptPromise = this.ui.prompt({
      type: 'confirm',
      name: 'answer',
      message: message,
      choices: [
        { key: 'y', name: 'Yes, remove it', value: 'yes' },
        { key: 'n', name: 'No, leave it there', value: 'no' }
      ]
    });

    return promptPromise.then(function(response) {
      if (response.answer) {
        return removeFile(filePath);
      } else {
        return Promise.resolve();
      }
    });
  },

  /**
   * Remove the specified file
   *
   * @param {string} filePath the relative path (from the project root) to remove
   * @return {Promise}
   */
  _removeFile: function(filePath) {
    var projectRoot = this.project.root;
    var fullPath = resolve(projectRoot, filePath);

    return new Promise(function(resolve, reject) {
      unlink(fullPath, function(error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
};
