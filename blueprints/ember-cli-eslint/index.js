module.exports = {
  name: 'ember-cli-eslint',

  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    var addonContext = this;

    return this.addPackageToProject('babel-eslint', '^1.0.14');
  }
};
