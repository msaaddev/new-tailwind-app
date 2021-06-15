const fs = require('fs');
const ErrorFormat = require('node-cli-handle-error');
const chalk = require('chalk');
const logSymbols = require('log-symbols');

module.exports = (name, err) => {
	// check if directory exists
	const filenames = fs.readdirSync(process.cwd());
	const isDirExist = filenames.indexOf(`${name}`) !== -1 ? true : false;

	if (isDirExist) {
		console.log(
			`\n${logSymbols.error} ${chalk.bgRed
				.hex(`#000000`)
				.bold(
					` ${name} `
				)} directory already exists. Try changing the name.\n`
		);
	} else {
		ErrorFormat(`Something went wrong.`, err);
	}
};
