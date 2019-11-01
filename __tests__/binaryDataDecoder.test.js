const BinaryDataDecoder = require('../src/binaryDataDecoder');


describe('Binary data Decoder Test', () => {
  it('After processing a right input binary data, it should output the correct binary data according to algorithm!', async () => {

    // for test i will not use read from .bin file I will just mock data
    const binaryDataDecoder = new BinaryDataDecoder('', '');

    binaryDataDecoder.inputData  = [0x00,0x61,0x01,0x01,0x00,0x62,0x03,0x02,0x03,0x03];

    await binaryDataDecoder.decode();

    const outputBuffer = Buffer.from(binaryDataDecoder.outputData);

    const expextedBuffer = Buffer.from([0x61,0x61,0x62,0x61,0x61,0x62,0x61,0x61]);

    expect(outputBuffer).toStrictEqual(expextedBuffer);
  });

  it('After processing a wrong input binary data, it should output data with 0x3F in first byte!', async () => {

    // for test i will not use read from .bin file I will just mock data
    const binaryDataDecoder = new BinaryDataDecoder('', '');

    binaryDataDecoder.inputData  = [0x01, 0x61, 0x01, 0x01, 0x00, 0x62, 0x03, 0x02, 0x03, 0x03];

    await binaryDataDecoder.decode();

    const outputBuffer = binaryDataDecoder.outputData;

    const expextedBuffer = Buffer.from([0x3F, 0x3F, 0x62, 0x3F, 0x3F, 0x62, 0x3F, 0x3F]);

    expect(outputBuffer).toStrictEqual(expextedBuffer);
  });
});
