'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.convert = convert;
exports.convertFromFile = convertFromFile;
exports.fileToFile = fileToFile;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _forEach = require('lodash.forEach');

var _forEach2 = _interopRequireDefault(_forEach);

function buildFile(colours) {
    var output = '// COLOURS\n';

    _forEach2['default'](colours, function (value, name) {
        output += '$' + name + ': ' + value + ';\n';
    });

    return output;
}

function convert(xresources) {
    var lines = xresources.split('\n'),
        pattern = /\*(background|foreground|color[0-9]{1,2}):\s*(#[0-9a-fA-F]{6})/,
        colours = {};

    lines.forEach(function (line) {
        var matches = pattern.exec(line);
        if (matches && matches[1]) {
            colours[matches[1]] = matches[2];
        }
    });

    return buildFile(colours);
}

function convertFromFile(inputPath, cb) {
    _fs2['default'].readFile(inputPath, { encoding: 'utf8' }, function (err, data) {
        if (err) {
            return cb(err);
        }

        cb(null, convert(data));
    });
}

function fileToFile(inputPath, outputPath, cb) {
    convertFromFile(inputPath, function (err, data) {
        if (err) {
            return cb(err);
        }

        _fs2['default'].writeFile(outputPath, data, { encoding: 'utf8' }, function (err) {
            if (err) {
                return cb(err);
            }

            cb();
        });
    });
}