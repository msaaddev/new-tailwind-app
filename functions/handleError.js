const fs = require('fs');
const ErrorFormat = require('node-cli-handle-error');
const chalk = require('chalk');
const logSymbols = require('log-symbols');

module.exports = (name, err, laravel = false) => {
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
		laravel &&
			console.log(
				`\n${logSymbols.error} Make sure you have ${chalk.bgGreen
					.hex(`#000000`)
					.bold(` laravel `)} installed in your computer.`
			);
		ErrorFormat(`Something went wrong.`, err);
	}
};
