const chalk = require('chalk');
const fs = require('fs');

class DataReaderWriter {
    async readData(inputFilePath) {
        try {
            const binaryDatainput = await fs.readFileSync(`${inputFilePath}`);
            console.log(chalk.green(`Data successfully read from: \n${inputFilePath}\n`));
            return binaryDatainput;
        } catch (e) {
            console.log(chalk.red('Error:', e.stack));
            return null;
        }
    }

    async writeData(buffer, outputFilePath) {
        await this.customWriteToFile(buffer, null, outputFilePath);
    }

    async customWriteToFile(buffer, permission, outputFilePath) {
        permission = permission || 438;
        let file;

        try {
            file = await fs.openSync(outputFilePath, 'w', permission);
        } catch (e) {
            console.log(chalk.yellow('Cannot write to file permission denied!'));
            await fs.chmodSync(outputFilePath, permission);
            file = await fs.openSync(outputFilePath, 'w', permission);
        }

        if (file) {
            await fs.writeSync(file, buffer, 0, buffer.length, 0);
            await fs.closeSync(file);
            console.log(chalk.green(`Data successfully written to:\n ${outputFilePath}\n`));
        }
    }
}

module.exports = DataReaderWriter;
