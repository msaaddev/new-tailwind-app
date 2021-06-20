const cliTable = require('cli-table');
const colors = require('colors');
const chalk = require('chalk');
const pkgJSON = require('../package.json');

/**
 *
 * checks whether an update is available for the CLI
 */
const notifyUpdate = async () => {
	let update = null;

	try {
		update = await checkForUpdate(pkgJSON);
	} catch (err) {}

	if (update) {
		console.log();
		console.log(
			chalk.yellow.bold(
				'A new version of `create-tailwind-app` is available!'
			)
		);
		console.log(
			'You can update by running: ' +
				chalk.cyan('npm i -g create-tailwind-app@latest')
		);
		console.log();
	}
};

module.exports = async () => {
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

	await notifyUpdate();
};
