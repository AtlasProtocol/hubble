#!/usr/bin/env node
require('source-map-support/register')

var Command = require("./lib/command");
var TaskError = require("./lib/errors/taskerror");
var HubbleError = require("hubble-error");
var version = require("./lib/version");
var OS = require("os");

var command = new Command(require("./lib/commands"));


var options = {
  logger: console
};

command.run(process.argv.slice(2), options, function(err) {
  if (err) {
    if (err instanceof TaskError) {
      command.args
        .usage("Hubble v" + (version.bundle || version.core) + " - a test framework for Nebulas"
        + OS.EOL + OS.EOL
        + 'Usage: hubble <command> [options]')
        .epilog("See more at http://hubbleframework.com/docs")
        .showHelp();
    } else {
      if (err instanceof HubbleError) {
        console.log(err.message);
      } else if (typeof err == "number") {
        // If a number is returned, exit with that number.
        process.exit(err);
      } else {
        // Bubble up all other unexpected errors.
        console.log(err.stack || err.toString());
      }
    }
    process.exit(1);
  }

  process.exit(0);
});
