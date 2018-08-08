var command = {
  command: 'exec',
  description: 'Run function of smart contract',
  builder: {
    all: {
      type: "boolean",
      default: false
    }
  },
  run: function (options, done) {
    var Config = require("hubble-config");
    var util = require ("./util");
    var config = Config.detect(options);
    var NVM = require('nebulas/lib/nvm/nvm');

    var fs = require('fs');

    var migraFiles = util.findSync(config.run_directory);

    if(migraFiles.length < 1){
        config.logger.log(
            "Error: `hubble exec` no test file found."
        );
        process.exit(1);
    }

    var contractFiles = util.findSync(config.contracts_directory);

    if(contractFiles.length < 1){
        config.logger.log(
            "Error: `hubble exec` no source file found."
        );
        process.exit(1);
    }

    try {
        var smartContract = fs.readFileSync(contractFiles[0], "utf-8");
        var nvm = new NVM(config.block, config.transaction);
        var testFile = fs.readFileSync(migraFiles[0], "utf-8");
        eval(testFile);
    }catch(e){
        config.logger.log(
            "Error: `hubble exec`" + e.toString()
        );
        process.exit(1);
    }
  }
}

module.exports = command;
