'use strict';

var blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
var setupTestHooks = blueprintHelpers.setupTestHooks;
var emberNew = blueprintHelpers.emberNew;
var emberGenerate = blueprintHelpers.emberGenerate;

var chai = require('ember-cli-blueprint-test-helpers/chai');
var expect = chai.expect;
var file = chai.file;

var td = require('testdouble');
td.config({ promiseConstructor: require('rsvp').Promise });

var requireFromCLI = require('ember-cli-blueprint-test-helpers/lib/helpers/require-from-cli');

describe('Acceptance: install ember-cli-eslint', function() {
  setupTestHooks(this);

  var Blueprint = requireFromCLI('lib/models/blueprint');
  var MockUI = requireFromCLI('tests/helpers/mock-ui');

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

    td.when(prompt(td.matchers.anything())).thenResolve({ deleteFiles: 'all' });

    return emberNew()
      .then(function() {
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

  it('does not remove any files if it shouldn\'t', function() {
    var args = ['ember-cli-eslint', 'foo'];

    td.when(prompt(td.matchers.anything())).thenResolve({ deleteFiles: 'none' });

    return emberNew()
      .then(function() {
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
