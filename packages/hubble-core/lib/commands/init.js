var command = {
  command: 'init',
  description: 'Initialize new and empty Nebulas project',
  builder: {},
  run: function (options, done) {
    var Config = require("hubble-config");
    var OS = require("os");
    var UnboxCommand = require("./unbox");

    var config = Config.default().with({
      logger: console
    });

    if (options._ && options._.length > 0) {
      config.logger.log(
        "Error: `hubble init` no longer accepts a project template name as an argument."
      );
      config.logger.log(
        " - For an empty project, use `hubble init` with no arguments" +
        OS.EOL
      );
      process.exit(1);
    }

    var url = "https://github.com/destinyzju/hubble-init-default.git";
    options._ = [url];

    UnboxCommand.run(options, done);
  }
}

module.exports = command;
