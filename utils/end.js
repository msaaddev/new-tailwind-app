const cliTable = require('cli-table');
const colors = require('colors');
const chalk = require('chalk');

module.exports = () => {
	// create a table
	const table = new cliTable();
	table.push([
		// ' Star '.bold.bgYellow.black,
		`${chalk.bgYellow.hex(`#000000`).bold(` Star `)}`,
		'https://github.com/msaaddev/create-tailwind-app'.grey
	]);
	table.push([
		`${chalk.bgCyan.hex(`#000000`).bold(` Follow `)}`,
		'http://twitter.com/msaaddev'.grey
	]);

	// display table
	console.log('');
	console.log(table.toString());
};
