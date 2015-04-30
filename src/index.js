
import fs from 'fs';
import forEach from 'lodash.forEach';


function buildFile(colours) {
    var output = '// COLOURS\n';

    forEach(colours, (value, name) => {
        output += `$${name}: ${value};\n`;
    });

    return output;
}


export function convert(xresources) {
    var lines   = xresources.split('\n'),
        pattern = /\*(background|foreground|color[0-9]{1,2}):\s*(#[0-9a-fA-F]{6})/,
        colours = {};

    lines.forEach((line) => {
        let matches = pattern.exec(line);
        if (matches && matches[1]) {
            colours[matches[1]] = matches[2];
        }
    });

    return buildFile(colours);
}

export function convertFromFile(inputPath, cb) {
    fs.readFile(inputPath, {encoding: 'utf8'}, function(err, data) {
        if (err) { return cb(err); }

        cb(null, convert(data));
    });
}

export function fileToFile(inputPath, outputPath, cb) {
    convertFromFile(inputPath, function(err, data) {
        if (err) { return cb(err); }

        fs.writeFile(outputPath, data, {encoding: 'utf8'},
                    function(err) {
                        if (err) { return cb(err); }

                        cb();
                    });
    });
}
