/*eslint-env node*/

module.exports = {
  name: 'ember-cli-eslint',

  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    if ('removePackageFromProject' in this) {
      return this.removePackageFromProject('ember-cli-jshint');
    }
  }
};
