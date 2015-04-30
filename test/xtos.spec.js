
require('mocha');
require('should');

suite('Xresources to SCSS', function() {
    var fs   = require('fs'),
        xtos = require('../dist/'),
        input = fs.readFileSync('test/fixtures/Xresources', {encoding: 'utf8'}),
        output = fs.readFileSync('test/fixtures/output.scss', {encoding: 'utf8'});

    test('convert to scss', function() {
        xtos.convert(input)
            .should.be.equal(output);
    });

    test('convert from file', function(done) {
        xtos.convertFromFile('test/fixtures/Xresources', function(err, converted) {
            if (err) { throw err; }

            converted.should.be.equal(output);
            done();
        });
    });

    test('convert from file to file', function(done) {
        xtos.fileToFile('test/fixtures/Xresources', 'test/tmp/output.scss', 
            function(err) {
            if (err) { throw err; }

            fs.readFileSync('test/tmp/output.scss', {encoding: 'utf8'})
                .should.be.equal(output);
            done();
        });
    });

});
