'use strict'

var fs = require('fs-extra');
var exec = require('child_process').exec;

var chai = require('chai');
chai.use(require('chai-things'));
var expect = chai.expect;

var FAILING_FILE = __dirname + '/../tests/dummy/app/unused.js';

var path = require('path');

describe('ember-cli-eslint', function() {
  this.timeout(60000);

  afterEach(function() {
    fs.removeSync(FAILING_FILE);
  });

  it('passes if ESLint tests pass', function() {
    process.env['NO_GROUPING'] = true;

    return emberTest().then(function(result) {
      expect(result.error).to.not.exist;
      expect(result.stdout.match(/[^\r\n]+/g))
        .to.include.something.that.matches(/ok 1 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app.js: should pass ESLint/)
        .to.include.something.that.matches(/ok 2 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| controllers\/thing.js: should pass ESLint/)
        .to.include.something.that.matches(/ok 3 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| helpers\/destroy-app.js: should pass ESLint/)
        .to.include.something.that.matches(/ok 4 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| helpers\/module-for-acceptance.js: should pass ESLint/)
        .to.include.something.that.matches(/ok 5 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| helpers\/start-app.js: should pass ESLint/)
        .to.include.something.that.matches(/ok 6 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| models\/thing.js: should pass ESLint/)
        .to.include.something.that.matches(/ok 7 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| resolver.js: should pass ESLint/)
        .to.include.something.that.matches(/ok 8 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| router.js: should pass ESLint/)
        .to.include.something.that.matches(/ok 9 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| test-helper.js: should pass ESLint/)
        .to.not.include.something.that.matches(/not ok 10 Chrome [0-9]+\.[0-9]+ \[[0-9]+ ms\] - ESLint \| unused.js: should pass ESLint/);
    })
  });

  it('fails if a ESLint tests fails', function() {
    process.env['NO_GROUPING'] = true;

    fs.outputFileSync(FAILING_FILE, 'let unused = 6;\n');

    return emberTest({ NO_GROUPING: true }).then(function(result) {
      expect(result.error).to.exist;
      expect(result.stdout.match(/[^\r\n]+/g))
        .to.include.something.that.matches(/ok 1 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app.js: should pass ESLint/)
        .to.include.something.that.matches(/ok 2 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| controllers\/thing.js: should pass ESLint/)
        .to.include.something.that.matches(/ok 3 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| helpers\/destroy-app.js: should pass ESLint/)
        .to.include.something.that.matches(/ok 4 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| helpers\/module-for-acceptance.js: should pass ESLint/)
        .to.include.something.that.matches(/ok 5 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| helpers\/start-app.js: should pass ESLint/)
        .to.include.something.that.matches(/ok 6 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| models\/thing.js: should pass ESLint/)
        .to.include.something.that.matches(/ok 7 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| resolver.js: should pass ESLint/)
        .to.include.something.that.matches(/ok 8 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| router.js: should pass ESLint/)
        .to.include.something.that.matches(/ok 9 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| test-helper.js: should pass ESLint/)
        .to.include.something.that.matches(/not ok 10 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| unused.js: should pass ESLint/);
    })
  });

  it('passes if ESLint tests pass (grouped)', function() {
    delete process.env['NO_GROUPING'];

    return emberTest().then(function(result) {
      expect(result.error).to.not.exist;
      expect(result.stdout.match(/[^\r\n]+/g))
        .to.include.something.that.matches(/ok 1 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app: app.js/)
        .to.include.something.that.matches(/ok 2 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app: controllers\/thing.js/)
        .to.include.something.that.matches(/ok 3 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app: models\/thing.js/)
        .to.include.something.that.matches(/ok 4 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app: resolver.js/)
        .to.include.something.that.matches(/ok 5 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app: router.js/)
        .to.not.include.something.that.matches(/not ok 6 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app: unused.js/);

      expect(result.stdout.match(/[^\r\n]+/g))
        .to.include.something.that.matches(/ok 6 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| tests: helpers\/destroy-app.js/)
        .to.include.something.that.matches(/ok 7 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| tests: helpers\/module-for-acceptance.js/)
        .to.include.something.that.matches(/ok 8 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| tests: helpers\/start-app.js/)
        .to.include.something.that.matches(/ok 9 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| tests: test-helper.js/);
    })
  });

  it('fails if a ESLint tests fails (grouped)', function() {
    delete process.env['NO_GROUPING'];

    fs.outputFileSync(FAILING_FILE, 'let unused = 6;\n');

    return emberTest().then(function(result) {
      expect(result.error).to.exist;
      expect(result.stdout.match(/[^\r\n]+/g))
        .to.include.something.that.matches(/ok 1 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app: app.js/)
        .to.include.something.that.matches(/ok 2 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app: controllers\/thing.js/)
        .to.include.something.that.matches(/ok 3 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app: models\/thing.js/)
        .to.include.something.that.matches(/ok 4 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app: resolver.js/)
        .to.include.something.that.matches(/ok 5 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app: router.js/)
        .to.include.something.that.matches(/not ok 6 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app: unused.js/);

      expect(result.stdout.match(/[^\r\n]+/g))
        .to.include.something.that.matches(/ok 7 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| tests: helpers\/destroy-app.js/)
        .to.include.something.that.matches(/ok 8 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| tests: helpers\/module-for-acceptance.js/)
        .to.include.something.that.matches(/ok 9 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| tests: helpers\/start-app.js/)
        .to.include.something.that.matches(/ok 10 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| tests: test-helper.js/);
    })
  });

  it('passes if jsx files are included', function() {
    process.env['JSX'] = true;

    return emberTest().then(function(result) {
      expect(result.error).to.not.exist;
      expect(result.stdout.match(/[^\r\n]+/g))
        .to.include.something.that.matches(/ok 1 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app: app.js/)
        .to.include.something.that.matches(/ok 2 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app: controllers\/thing.js/)
        .to.include.something.that.matches(/ok 3 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app: models\/thing.js/)
        .to.include.something.that.matches(/ok 4 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app: resolver.js/)
        .to.include.something.that.matches(/ok 5 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app: router.js/)
        .to.include.something.that.matches(/ok 6 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app: routes\/thing.jsx/)
        .to.not.include.something.that.matches(/not ok 7 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| app: unused.js/);

      expect(result.stdout.match(/[^\r\n]+/g))
        .to.include.something.that.matches(/ok 7 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| tests: helpers\/destroy-app.js/)
        .to.include.something.that.matches(/ok 8 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| tests: helpers\/module-for-acceptance.js/)
        .to.include.something.that.matches(/ok 9 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| tests: helpers\/start-app.js/)
        .to.include.something.that.matches(/ok 10 Chrome [0-9]+\.[0-9]+ - \[[0-9]+ ms\] - ESLint \| tests: test-helper.js/);
    })
  });
});

function emberTest() {
  return new Promise(function(resolve) {
    exec('node_modules/.bin/ember test', { cwd: path.join(__dirname, '..'), env: process.env }, function (error, stdout, stderr) {
      resolve({
        error: error,
        stdout: stdout,
        stderr: stderr
      });
    });
  });
}
