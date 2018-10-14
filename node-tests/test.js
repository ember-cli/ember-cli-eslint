var fs = require('fs-extra');
var exec = require('child_process').exec;

var expect = require('chai').expect;

var FAILING_FILE = __dirname + '/../tests/dummy/app/unused.js';

var execSync = require('child_process').execSync;

var chromeVersion = execSync('google-chrome --product-version').toString();
var browser = 'Chrome ' + chromeVersion.split('.').slice(0, 2).join('.');
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
        .to.contain(`ok 1 ${browser} - ESLint | app.js: should pass ESLint`)
        .to.contain(`ok 2 ${browser} - ESLint | controllers/thing.js: should pass ESLint`)
        .to.contain(`ok 3 ${browser} - ESLint | helpers/destroy-app.js: should pass ESLint`)
        .to.contain(`ok 4 ${browser} - ESLint | helpers/module-for-acceptance.js: should pass ESLint`)
        .to.contain(`ok 5 ${browser} - ESLint | helpers/resolver.js: should pass ESLint`)
        .to.contain(`ok 6 ${browser} - ESLint | helpers/start-app.js: should pass ESLint`)
        .to.contain(`ok 7 ${browser} - ESLint | models/thing.js: should pass ESLint`)
        .to.contain(`ok 8 ${browser} - ESLint | resolver.js: should pass ESLint`)
        .to.contain(`ok 9 ${browser} - ESLint | router.js: should pass ESLint`)
        .to.contain(`ok 10 ${browser} - ESLint | test-helper.js: should pass ESLint`)
        .to.not.contain(`not ok 11 ${browser} - ESLint | unused.js: should pass ESLint`);
    })
  });

  it('fails if a ESLint tests fails', function() {
    process.env['NO_GROUPING'] = true;

    fs.outputFileSync(FAILING_FILE, 'let unused = 6;\n');

    return emberTest({ NO_GROUPING: true }).then(function(result) {
      expect(result.error).to.exist;
      expect(result.stdout.match(/[^\r\n]+/g))
        .to.contain(`ok 1 ${browser} - ESLint | app.js: should pass ESLint`)
        .to.contain(`ok 2 ${browser} - ESLint | controllers/thing.js: should pass ESLint`)
        .to.contain(`ok 3 ${browser} - ESLint | helpers/destroy-app.js: should pass ESLint`)
        .to.contain(`ok 4 ${browser} - ESLint | helpers/module-for-acceptance.js: should pass ESLint`)
        .to.contain(`ok 5 ${browser} - ESLint | helpers/resolver.js: should pass ESLint`)
        .to.contain(`ok 6 ${browser} - ESLint | helpers/start-app.js: should pass ESLint`)
        .to.contain(`ok 7 ${browser} - ESLint | models/thing.js: should pass ESLint`)
        .to.contain(`ok 8 ${browser} - ESLint | resolver.js: should pass ESLint`)
        .to.contain(`ok 9 ${browser} - ESLint | router.js: should pass ESLint`)
        .to.contain(`ok 10 ${browser} - ESLint | test-helper.js: should pass ESLint`)
        .to.contain(`not ok 11 ${browser} - ESLint | unused.js: should pass ESLint`);
    })
  });

  it('passes if ESLint tests pass (grouped)', function() {
    delete process.env['NO_GROUPING'];

    return emberTest().then(function(result) {
      expect(result.error).to.not.exist;
      expect(result.stdout.match(/[^\r\n]+/g))
        .to.contain(`ok 1 ${browser} - ESLint | app: app.js`)
        .to.contain(`ok 2 ${browser} - ESLint | app: controllers/thing.js`)
        .to.contain(`ok 3 ${browser} - ESLint | app: models/thing.js`)
        .to.contain(`ok 4 ${browser} - ESLint | app: resolver.js`)
        .to.contain(`ok 5 ${browser} - ESLint | app: router.js`)
        .to.not.contain(`not ok 6 ${browser} - ESLint | app: unused.js`);

      expect(result.stdout.match(/[^\r\n]+/g))
        .to.contain(`ok 6 ${browser} - ESLint | tests: helpers/destroy-app.js`)
        .to.contain(`ok 7 ${browser} - ESLint | tests: helpers/module-for-acceptance.js`)
        .to.contain(`ok 8 ${browser} - ESLint | tests: helpers/resolver.js`)
        .to.contain(`ok 9 ${browser} - ESLint | tests: helpers/start-app.js`)
        .to.contain(`ok 10 ${browser} - ESLint | tests: test-helper.js`);
    })
  });

  it('fails if a ESLint tests fails (grouped)', function() {
    delete process.env['NO_GROUPING'];

    fs.outputFileSync(FAILING_FILE, 'let unused = 6;\n');

    return emberTest().then(function(result) {
      expect(result.error).to.exist;
      expect(result.stdout.match(/[^\r\n]+/g))
        .to.contain(`ok 1 ${browser} - ESLint | app: app.js`)
        .to.contain(`ok 2 ${browser} - ESLint | app: controllers/thing.js`)
        .to.contain(`ok 3 ${browser} - ESLint | app: models/thing.js`)
        .to.contain(`ok 4 ${browser} - ESLint | app: resolver.js`)
        .to.contain(`ok 5 ${browser} - ESLint | app: router.js`)
        .to.contain(`not ok 6 ${browser} - ESLint | app: unused.js`);

      expect(result.stdout.match(/[^\r\n]+/g))
        .to.contain(`ok 7 ${browser} - ESLint | tests: helpers/destroy-app.js`)
        .to.contain(`ok 8 ${browser} - ESLint | tests: helpers/module-for-acceptance.js`)
        .to.contain(`ok 9 ${browser} - ESLint | tests: helpers/resolver.js`)
        .to.contain(`ok 10 ${browser} - ESLint | tests: helpers/start-app.js`)
        .to.contain(`ok 11 ${browser} - ESLint | tests: test-helper.js`);
    })
  });

  it('passes if jsx files are included', function() {
    process.env['JSX'] = true;

    return emberTest().then(function(result) {
      expect(result.error).to.not.exist;
      expect(result.stdout.match(/[^\r\n]+/g))
        .to.contain(`ok 1 ${browser} - ESLint | app: app.js`)
        .to.contain(`ok 2 ${browser} - ESLint | app: controllers/thing.js`)
        .to.contain(`ok 3 ${browser} - ESLint | app: models/thing.js`)
        .to.contain(`ok 4 ${browser} - ESLint | app: resolver.js`)
        .to.contain(`ok 5 ${browser} - ESLint | app: router.js`)
        .to.contain(`ok 6 ${browser} - ESLint | app: routes/thing.jsx`)
        .to.not.contain(`not ok 7 ${browser} - ESLint | app: unused.js`);

      expect(result.stdout.match(/[^\r\n]+/g))
        .to.contain(`ok 7 ${browser} - ESLint | tests: helpers/destroy-app.js`)
        .to.contain(`ok 8 ${browser} - ESLint | tests: helpers/module-for-acceptance.js`)
        .to.contain(`ok 9 ${browser} - ESLint | tests: helpers/resolver.js`)
        .to.contain(`ok 10 ${browser} - ESLint | tests: helpers/start-app.js`)
        .to.contain(`ok 11 ${browser} - ESLint | tests: test-helper.js`);
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
