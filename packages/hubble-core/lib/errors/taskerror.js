var HubbleError = require("hubble-error");
var inherits = require("util").inherits;

inherits(TaskError, HubbleError);

function TaskError(message) {
  TaskError.super_.call(this, message);
};

module.exports = TaskError;
