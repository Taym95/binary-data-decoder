const chalk = require('chalk');
const BinaryDataReaderWriter = require('./binaryDataReaderWriter');

class BinaryDataDecoder {
  constructor(inputFile, outputFile) {
    this.inputFilePath = `${__dirname}/assets/${inputFile}`;
    this.outputFilePath = `${__dirname}/assets/${outputFile}`;
    this.inputData = null;
    this.outputData = null;
    this.binaryDataReaderWriter = new BinaryDataReaderWriter();
  }

  async process() {
    await this.read();
    this.decode();
    await this.write();
  }

  // read binary from given input file
  async read() {
    await this.deleteOldOutput();
    this.inputData = await this.binaryDataReaderWriter.readData(this.inputFilePath);
  }

  // write binary to given output file
  async write() {
    await this.binaryDataReaderWriter.writeData(this.outputData, this.outputFilePath);
  }
  
  
  // decode binary data according to algorithm!
  decode() {
    let decodedData = [];
    for (var index = 0; index < this.inputData.length; index = index + 2) {
      let dataPair = [this.inputData[index], this.inputData[index + 1]];

      if (dataPair[0] == 0) {

        decodedData.push(dataPair[1]);

      } else {

        let currentLength = decodedData.length;
        
        let nextIndex = currentLength - dataPair[0];

        let nextLength = nextIndex + dataPair[1];

        if (nextIndex < 0 || nextLength > currentLength) {
          decodedData.push(0x3F);
          console.log(chalk.red(`Input binary data contain invalid data in first pair!`));
        }
        else {
          for (var j = nextIndex; j < nextLength; j++) {
            decodedData.push(decodedData[j]);
          }
        }
      }
    }
    this.outputData = Buffer.from(decodedData);
  }

  async deleteOldOutput() {
    await this.binaryDataReaderWriter.deleteOutput(this.outputFilePath);
  }

  
  async readOutput() {
    this.outputData = await this.binaryDataReaderWriter.readData(this.outputFilePath);
  }
}

module.exports = BinaryDataDecoder;
