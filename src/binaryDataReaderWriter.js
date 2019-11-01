const fs = require('fs');
const chalk = require('chalk');
const DataReaderWriter = require('./dataReaderWriter');

class BinaryDataReaderWriter extends DataReaderWriter {

  async deleteOutput(outputFilePath) {
    try {
      await fs.unlinkSync(outputFilePath);
    } catch (e) {
      console.log(chalk.yellow('First Time running this program, cannot delete old output.bin file because it does not exist yet!\n'));
    }
  }

}

module.exports = BinaryDataReaderWriter;
