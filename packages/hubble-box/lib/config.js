var fs = require("fs-extra");

function setDefaults(config) {
  config = config || {};

  var hooks = config.hooks || {};

  return {
    ignore: config.ignore || [],
    commands: config.commands || {
      "compile": "hubble compile",
      "migrate": "hubble migrate",
      "test": "hubble test"
    },
    hooks: {
      "post-unpack": hooks["post-unpack"] || ""
    }
  };
}

function read(path) {
  return fs.readFile(path)
    .catch(function() {
      return "{}";
    })
    .then(JSON.parse)
    .then(setDefaults);
}

module.exports = {
  read: read,
  setDefaults: setDefaults
}
