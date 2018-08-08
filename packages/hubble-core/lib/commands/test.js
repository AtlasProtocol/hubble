var command = {
    command: 'test',
    description: 'Run Nebulas contract tests',
    builder: {},
    run: function (options, done) {
        var dir = require("node-dir");
        var Config = require("hubble-config");
        var Test = require("../test");
        var fs = require("fs");
        var config = Config.detect(options);

        var files = [];

        if (options.file) {
            files = [options.file];
        } else if (options._.length > 0) {
            Array.prototype.push.apply(files, options._);
        }

        function getFiles(callback) {
            if (files.length != 0) {
                return callback(null, files);
            }

            dir.files(config.test_directory, callback);
        };

        getFiles(function(err, files) {

        if (err) return done(err);

        files = files.filter(function(file) {
            return file.match(config.test_file_extension_regexp) != null;
        });

        function run() {
            Test.run(config.with({
            test_files: files,
            contracts_build_directory: config.test_directory,
            working_directory: config.working_directory
            }));
        };

        var runTest = function(err) {
            if (err) return done(err);
            fs.stat(config.test_directory, function(err, stat) {
                if (err){
                    return run();
                }
                run ();
            });
        }

        runTest();
        });
    }
}

module.exports = command;