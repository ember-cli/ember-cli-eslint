module.exports = {
  name: 'ember-cli-eslint',

  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function () {
    return this.addPackageToProject({
      name: 'eslint-config-ember',
      target: '^0.0.5'
    });
  },

  afterInstall: function() {
    var addonContext = this;
  }
};
