/*eslint-env node*/

'use strict';

module.exports = {
  name: 'lint',
  description: 'Run ESLint on your Ember app',
  works: 'insideProject',

  run: require('../tasks/lint')
};
