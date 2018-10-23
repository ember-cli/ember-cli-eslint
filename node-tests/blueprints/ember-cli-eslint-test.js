'use strict';

var blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
var setupTestHooks = blueprintHelpers.setupTestHooks;
var fs = require('fs-extra');
var path = require('path');
var emberNew = blueprintHelpers.emberNew;
var emberGenerate = blueprintHelpers.emberGenerate;
var modifyPackages = blueprintHelpers.modifyPackages;

var chai = require('ember-cli-blueprint-test-helpers/chai');
var expect = chai.expect;
var file = chai.file;

var td = require('testdouble');
td.config({ promiseConstructor: require('rsvp').Promise });

var requireFromCLI = require('ember-cli-blueprint-test-helpers/lib/helpers/require-from-cli');

describe('Acceptance: install ember-cli-eslint', function() {
  setupTestHooks(this);

  var Blueprint = requireFromCLI('lib/models/blueprint');
  var MockUI = require('console-ui/mock');

  var taskFor, installTaskRun, uninstallTaskRun, prompt;
  beforeEach(function() {
    installTaskRun = td.function();
    td.when(installTaskRun(td.matchers.anything())).thenResolve();

    uninstallTaskRun = td.function();
    td.when(uninstallTaskRun(td.matchers.anything())).thenResolve();

    taskFor = td.function();
    td.when(taskFor('npm-install')).thenReturn({ run: installTaskRun });
    td.when(taskFor('npm-uninstall')).thenReturn({ run: uninstallTaskRun });

    td.replace(Blueprint.prototype, 'taskFor', taskFor);

    prompt = td.function();
    td.replace(MockUI.prototype, 'prompt', prompt);
  });

  afterEach(function() {
    td.reset();
  });

  it('removes the JSHint addon', function() {
    var args = ['ember-cli-eslint', 'foo'];

    td.when(prompt(td.matchers.anything())).thenResolve({ answer: 'overwrite', deleteFiles: 'all' });

    return emberNew()
      .then(function() {
        fs.ensureFileSync('.jshintrc');
        fs.ensureFileSync('tests/.jshintrc');

        modifyPackages([
          { name: 'ember-cli-jshint', dev: true }
        ]);

        expect(file('package.json')).to.contain('ember-cli-jshint');
        expect(file('.jshintrc')).to.exist;
        expect(file('tests/.jshintrc')).to.exist;
      })
      .then(function() {
        return emberGenerate(args);
      })
      .then(function() {
        // verify that `npm uninstall --save-dev ember-cli-jshint` was called
        var captor = td.matchers.captor();
        td.verify(uninstallTaskRun(captor.capture()));
        var taskOptions = captor.value;
        expect(taskOptions.packages).to.contain('ember-cli-jshint');

        // verify that the JSHint config file were deleted
        expect(file('.jshintrc')).to.not.exist;
        expect(file('tests/.jshintrc')).to.not.exist;
      });
  });

  it('Does not touch foreign .jshintrc files', function() {
    var args = ['ember-cli-eslint', 'foo'];
    var foreignJshintrcPaths = [
      path.join('.', 'bower_components', 'foreign-package', '.jshintrc'),
      path.join('.', 'tmp', '.jshintrc'),
      path.join('.', 'tests', 'dummy', 'app', 'node_modules', 'foreign-package', '.jshintrc'),
      path.join('.', 'tests', 'dummy', 'app', 'dist', '.jshintrc')
    ];

    td.when(prompt(td.matchers.anything())).thenResolve({ answer: 'overwrite', deleteFiles: 'all' });

    return emberNew()
      .then(function() {
        foreignJshintrcPaths.forEach(function(foreignJshintrcPath) {
          fs.ensureFileSync(foreignJshintrcPath);
        });
      })
      .then(function() {
        return emberGenerate(args);
      })
      .then(function() {
        foreignJshintrcPaths.forEach(function(foreignJshintrcPath) {
          expect(file(foreignJshintrcPath)).to.exist;
        });
      });
  });

  it('does not remove any files if it shouldn\'t', function() {
    var args = ['ember-cli-eslint', 'foo'];

    td.when(prompt(td.matchers.anything())).thenResolve({ answer: 'overwrite', deleteFiles: 'none' });

    return emberNew()
      .then(function() {
        fs.ensureFileSync('.jshintrc');
        fs.ensureFileSync('tests/.jshintrc');

        expect(file('.jshintrc')).to.exist;
        expect(file('tests/.jshintrc')).to.exist;
      })
      .then(function() {
        return emberGenerate(args);
      })
      .then(function() {
        // verify that the JSHint config file were *not* deleted
        expect(file('.jshintrc')).to.exist;
        expect(file('tests/.jshintrc')).to.exist;
      });
  });
});
