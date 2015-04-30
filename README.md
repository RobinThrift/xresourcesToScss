# .Xresources to SCSS

This will take a `.Xresources` file, extract the colours and output them as variables into a `.scss` file. 
There will be a variable for each colour (i. e. `color0-15`) with the same name.

## Usage

### `.convert(input)`
This will simply return the SCSS string.

### `.convertFromFile(inputPath, cb`
Takes a file path as it's first argument, and will call the given callback
with a possible error as the first argument and the output as the second: `cb(err, output)`.

### `.fileToFile(inputPath, outputPath, cb)`
Converts the file at `inputPath` to a SCSS file at `outputPath`.
