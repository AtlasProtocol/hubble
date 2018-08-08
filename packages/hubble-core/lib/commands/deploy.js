var command = {
  command: 'deploy',
  description: 'Deploy smart contract',
  builder: {
    all: {
      type: "boolean",
      default: false
    }
  },
  run: function (options, done) {
    var Config = require("hubble-config");
    var defaultConfig = Config.detect(options);
    var NVM = require('nebulas/lib/nvm/nvm');
    var util = require("./util");
    var fs = require('fs');

    localStorage.clear()

    var config = Config.default().with({
      logger: console
    });

    var files = util.findSync(config.contracts_directory);

    if(files.length < 1){
        config.logger.log(
            "Error: `hubble deploy` no source file found."
        );
        process.exit(1);
    }

    try {
        var smartContract = fs.readFileSync(files[0], "utf-8");
        var nvm = new NVM(defaultConfig.block, defaultConfig.transaction);
        var deploy = nvm.deploy(smartContract, "[]");

    }catch(e){
        config.logger.log(
            "Error: `hubble deploy`" + e.toString()
        );
        process.exit(1);
    }

    config.logger.log(
        "Contract successfully deployed!"
    );
  }
}

module.exports = command;
