var _ = require("lodash");
var path = require("path");
var Module = require('module');
var findUp = require("find-up");
var originalrequire = require("original-require");
var HubbleError = require("hubble-error");

var DEFAULT_CONFIG_FILENAME = "hubble.js";
var BACKUP_CONFIG_FILENAME = "hubble-config.js"; // For Windows + Command Prompt

function Config(hubble_directory, working_directory) {
  var self = this;


  this._values = {
    hubble_directory: hubble_directory || path.resolve(path.join(__dirname, "../")),
    working_directory: working_directory || process.cwd(),
    verboseRpc: false,
    from: null,
    build: null,
    logger: {
      log: function() {},
    }
  };

  var props = {
    // These are already set.
    hubble_directory: function() {},
    working_directory: function() {},
    verboseRpc: function() {},
    build: function() {},
    logger: function() {},

    build_directory: function() {
      return path.join(self.working_directory, "build");
    },
    contracts_directory: function() {
      return path.join(self.working_directory, "contracts");
    },
    run_directory: function() {
      return path.join(self.working_directory, "run");
    },
    test_directory: function() {
      return path.join(self.working_directory, "test");
    },
    init_directory: function() {
      return path.join(self.working_directory, "init");
    },
    test_file_extension_regexp: function() {
      return /.*\.(js|ts)$/
    },
    example_project_directory: function() {
      return path.join(self.hubble_directory, "example");
    },
    working_directory:function(){
      return self.working_directory;
    },
    block:function(){
      return self.block;
    },
    transaction:function(){
      return self.transaction;
    }
  };

  Object.keys(props).forEach(function(prop) {
    self.addProp(prop, props[prop]);
  });
};

Config.prototype.addProp = function(key, obj) {
  Object.defineProperty(this, key, {
    get: obj.get || function() {
      return this._values[key] || obj();
    },
    set: obj.set || function(val) {
      this._values[key] = val;
    },
    configurable: true,
    enumerable: true
  });
};

Config.prototype.normalize = function(obj) {
  var clone = {};
  Object.keys(obj).forEach(function(key) {
    try {
      clone[key] = obj[key];
    } catch (e) {
      // Do nothing with values that throw.
    }
  });
  return clone;
}

Config.prototype.with = function(obj) {
  var normalized = this.normalize(obj);
  var current = this.normalize(this);

  return _.extend({}, current, normalized);
};

Config.prototype.merge = function(obj) {
  var self = this;
  var clone = this.normalize(obj);

  // Only set keys for values that don't throw.
  Object.keys(obj).forEach(function(key) {
    try {
      self[key] = clone[key];
    } catch (e) {
      // Do nothing.
    }
  });

  return this;
};

Config.default = function() {
  return new Config();
};

Config.detect = function(options, filename) {
  var search;

  (!filename)
    ? search = [DEFAULT_CONFIG_FILENAME, BACKUP_CONFIG_FILENAME]
    : search = filename;

  var file = findUp.sync(search, {cwd: options.working_directory || options.workingDirectory});

  if (file == null) {
    throw new HubbleError("Could not find suitable configuration file or you may need to run init first.");
  }

  return this.load(file, options);
};

Config.load = function(file, options) {
  var config = new Config();

  config.working_directory = path.dirname(path.resolve(file));

  delete require.cache[Module._resolveFilename(file, module)];
  var static_config = originalrequire(file);

  config.merge(static_config);
  config.merge(options);

  return config;
};

module.exports = Config;
