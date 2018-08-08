var pkg = require("./package.json");

module.exports = {
  config: require("./lib/config"),
  init: require("./lib/init"),
  version: pkg.version
};
