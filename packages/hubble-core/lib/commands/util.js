"use strict";

var join = require('path').join;
var fs = require('fs');

var util = {
    findSync : function(startPath) {
        var result=[];
        function finder(path) {
            var files=fs.readdirSync(path);
            files.forEach((val,index) => {
                var fPath=join(path,val);
                var stats=fs.statSync(fPath);
                if(stats.isFile()) result.push(fPath);
            });
        }
        finder(startPath);
        return result;
    }
};

module.exports = util;