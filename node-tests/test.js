var fs = require('fs-extra');
var exec = require('child_process').exec;

var expect = require('chai').expect;

var FAILING_FILE = __dirname + '/../tests/dummy/app/unused.js';

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
        .to.contain('ok 1 PhantomJS 2.1 - ESLint | app.js: should pass ESLint')
        .to.contain('ok 2 PhantomJS 2.1 - ESLint | controllers/thing.js: should pass ESLint')
        .to.contain('ok 3 PhantomJS 2.1 - ESLint | helpers/destroy-app.js: should pass ESLint')
        .to.contain('ok 4 PhantomJS 2.1 - ESLint | helpers/module-for-acceptance.js: should pass ESLint')
        .to.contain('ok 5 PhantomJS 2.1 - ESLint | helpers/resolver.js: should pass ESLint')
        .to.contain('ok 6 PhantomJS 2.1 - ESLint | helpers/start-app.js: should pass ESLint')
        .to.contain('ok 7 PhantomJS 2.1 - ESLint | models/thing.js: should pass ESLint')
        .to.contain('ok 8 PhantomJS 2.1 - ESLint | resolver.js: should pass ESLint')
        .to.contain('ok 9 PhantomJS 2.1 - ESLint | router.js: should pass ESLint')
        .to.contain('ok 10 PhantomJS 2.1 - ESLint | test-helper.js: should pass ESLint')
        .to.not.contain('not ok 11 PhantomJS 2.1 - ESLint | unused.js: should pass ESLint');
    })
  });

  it('fails if a ESLint tests fails', function() {
    process.env['NO_GROUPING'] = true;

    fs.outputFileSync(FAILING_FILE, 'let unused = 6;\n');

    return emberTest({ NO_GROUPING: true }).then(function(result) {
      expect(result.error).to.exist;
      expect(result.stdout.match(/[^\r\n]+/g))
        .to.contain('ok 1 PhantomJS 2.1 - ESLint | app.js: should pass ESLint')
        .to.contain('ok 2 PhantomJS 2.1 - ESLint | controllers/thing.js: should pass ESLint')
        .to.contain('ok 3 PhantomJS 2.1 - ESLint | helpers/destroy-app.js: should pass ESLint')
        .to.contain('ok 4 PhantomJS 2.1 - ESLint | helpers/module-for-acceptance.js: should pass ESLint')
        .to.contain('ok 5 PhantomJS 2.1 - ESLint | helpers/resolver.js: should pass ESLint')
        .to.contain('ok 6 PhantomJS 2.1 - ESLint | helpers/start-app.js: should pass ESLint')
        .to.contain('ok 7 PhantomJS 2.1 - ESLint | models/thing.js: should pass ESLint')
        .to.contain('ok 8 PhantomJS 2.1 - ESLint | resolver.js: should pass ESLint')
        .to.contain('ok 9 PhantomJS 2.1 - ESLint | router.js: should pass ESLint')
        .to.contain('ok 10 PhantomJS 2.1 - ESLint | test-helper.js: should pass ESLint')
        .to.contain('not ok 11 PhantomJS 2.1 - ESLint | unused.js: should pass ESLint');
    })
  });

  it('passes if ESLint tests pass (grouped)', function() {
    delete process.env['NO_GROUPING'];

    return emberTest().then(function(result) {
      expect(result.error).to.not.exist;
      expect(result.stdout.match(/[^\r\n]+/g))
        .to.contain('ok 1 PhantomJS 2.1 - ESLint | app: app.js')
        .to.contain('ok 2 PhantomJS 2.1 - ESLint | app: controllers/thing.js')
        .to.contain('ok 3 PhantomJS 2.1 - ESLint | app: models/thing.js')
        .to.contain('ok 4 PhantomJS 2.1 - ESLint | app: resolver.js')
        .to.contain('ok 5 PhantomJS 2.1 - ESLint | app: router.js')
        .to.not.contain('not ok 6 PhantomJS 2.1 - ESLint | app: unused.js');

      expect(result.stdout.match(/[^\r\n]+/g))
        .to.contain('ok 6 PhantomJS 2.1 - ESLint | tests: helpers/destroy-app.js')
        .to.contain('ok 7 PhantomJS 2.1 - ESLint | tests: helpers/module-for-acceptance.js')
        .to.contain('ok 8 PhantomJS 2.1 - ESLint | tests: helpers/resolver.js')
        .to.contain('ok 9 PhantomJS 2.1 - ESLint | tests: helpers/start-app.js')
        .to.contain('ok 10 PhantomJS 2.1 - ESLint | tests: test-helper.js');
    })
  });

  it('fails if a ESLint tests fails (grouped)', function() {
    delete process.env['NO_GROUPING'];

    fs.outputFileSync(FAILING_FILE, 'let unused = 6;\n');

    return emberTest().then(function(result) {
      expect(result.error).to.exist;
      expect(result.stdout.match(/[^\r\n]+/g))
        .to.contain('ok 1 PhantomJS 2.1 - ESLint | app: app.js')
        .to.contain('ok 2 PhantomJS 2.1 - ESLint | app: controllers/thing.js')
        .to.contain('ok 3 PhantomJS 2.1 - ESLint | app: models/thing.js')
        .to.contain('ok 4 PhantomJS 2.1 - ESLint | app: resolver.js')
        .to.contain('ok 5 PhantomJS 2.1 - ESLint | app: router.js')
        .to.contain('not ok 6 PhantomJS 2.1 - ESLint | app: unused.js');

      expect(result.stdout.match(/[^\r\n]+/g))
        .to.contain('ok 7 PhantomJS 2.1 - ESLint | tests: helpers/destroy-app.js')
        .to.contain('ok 8 PhantomJS 2.1 - ESLint | tests: helpers/module-for-acceptance.js')
        .to.contain('ok 9 PhantomJS 2.1 - ESLint | tests: helpers/resolver.js')
        .to.contain('ok 10 PhantomJS 2.1 - ESLint | tests: helpers/start-app.js')
        .to.contain('ok 11 PhantomJS 2.1 - ESLint | tests: test-helper.js');
    })
  });

  it('passes if jsx files are included', function() {
    process.env['JSX'] = true;

    return emberTest().then(function(result) {
      expect(result.error).to.not.exist;
      expect(result.stdout.match(/[^\r\n]+/g))
        .to.contain('ok 1 PhantomJS 2.1 - ESLint | app: app.js')
        .to.contain('ok 2 PhantomJS 2.1 - ESLint | app: controllers/thing.js')
        .to.contain('ok 3 PhantomJS 2.1 - ESLint | app: models/thing.js')
        .to.contain('ok 4 PhantomJS 2.1 - ESLint | app: resolver.js')
        .to.contain('ok 5 PhantomJS 2.1 - ESLint | app: router.js')
        .to.contain('ok 6 PhantomJS 2.1 - ESLint | app: routes/thing.jsx')
        .to.not.contain('not ok 7 PhantomJS 2.1 - ESLint | app: unused.js');

      expect(result.stdout.match(/[^\r\n]+/g))
        .to.contain('ok 7 PhantomJS 2.1 - ESLint | tests: helpers/destroy-app.js')
        .to.contain('ok 8 PhantomJS 2.1 - ESLint | tests: helpers/module-for-acceptance.js')
        .to.contain('ok 9 PhantomJS 2.1 - ESLint | tests: helpers/resolver.js')
        .to.contain('ok 10 PhantomJS 2.1 - ESLint | tests: helpers/start-app.js')
        .to.contain('ok 11 PhantomJS 2.1 - ESLint | tests: test-helper.js');
    })
  });
});

function emberTest() {
  return new Promise(function(resolve) {
    exec('node_modules/.bin/ember test', { cwd: __dirname + '/..', env: process.env }, function (error, stdout, stderr) {
      resolve({
        error: error,
        stdout: stdout,
        stderr: stderr
      });
    });
  });
}
