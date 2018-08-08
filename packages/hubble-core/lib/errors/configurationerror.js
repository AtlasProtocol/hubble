var HubbleError = require("hubble-error");
var inherits = require("util").inherits;

inherits(ConfigurationError, HubbleError);

function ConfigurationError(message) {
    ConfigurationError.super_.call(this, message);
}

module.exports = ConfigurationError;
