var path = require("path");
var Config = require("hubble-config");
var jest = require('jest-cli');

var Test = {
  run: function(options) {

    var config = Config.default().merge(options);

    config.test_files = config.test_files.map(function(test_file) {
      return path.resolve(test_file);
    });

    var js_tests = config.test_files.filter(function(file) {
      return path.extname(file) != ".js";
    });

    console.log(config.hubble_directory);

    var configFile = path.join(config.hubble_directory,"package.json");

    const jestConfig = {
      projects: [config.contracts_build_directory],
      silent: false,
      testMatch: ['**/?(*.)(test).js?(x)'],
      runInBand: false,
      verbose: true,
      config: configFile,
      coverage: true,
      rootDir: config.contracts_build_directory,
      roots:[config.contracts_build_directory],
    };

    var onComplete = function (result) {
      console.log("onComplete");
      if (result) {
      } else {
          console.log('!!! Jest tests failed! You should fix them soon. !!!');
      }
      callback();
    }
    jest.runCLI(jestConfig,jestConfig.projects, onComplete);

  }
};

module.exports = Test;