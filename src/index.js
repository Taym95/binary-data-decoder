// For good development experience, we should use Typescript or Flow!

const BinaryDataDecoder = require('./binaryDataDecoder');


// please put your input.bin inside src/assets before running the code 

const binaryDataDecoder = new BinaryDataDecoder('input.bin', 'output.bin');
binaryDataDecoder.process();

