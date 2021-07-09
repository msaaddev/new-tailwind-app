const cliTable = require('cli-table');
const colors = require('colors');
const chalk = require('chalk');
const pkgJSON = require('../package.json');
const logSymbols = require('log-symbols');
const checkForUpdate = require('update-check');

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
				'A new version of `new-tailwind-app` is available!'
			)
		);
		console.log(
			'You can update by running: ' +
				chalk.cyan('npm i -g new-tailwind-app@latest')
		);
		console.log();
	}
};

module.exports = async (name, app) => {
	// type of tailwind app
	const basicApp = app === '--basic' || app === '-b' ? true : false;
	const nextApp =
		app === '--next' || app === '-n' || app === '--next.js' ? true : false;
	const reactApp =
		app === '--react' || app === '-r' || app === '--react.js'
			? true
			: false;
	const gatsbyApp =
		app === '--gatsby' || app === '-g' || app === '--gatsby.js'
			? true
			: false;
	const laravelApp = app === '--laravel' || app === '-l' ? true : false;
	const vueApp = app === '--vue3' || app === '-v' ? true : false;

	console.log();
	if (basicApp) {
		console.log(
			logSymbols.info,
			chalk.bgGreen.hex(`#000000`).bold(` Basic App `),
			`with ${chalk.bgGreen.hex(`#000000`).bold(` Tailwind `)}`,
			'created successfully.'
		);

		console.log(`\n${chalk.dim('I suggest that you begin by typing: \n')}`);
		console.log(chalk.cyan(`cd`), `${name}`);
		console.log(chalk.cyan(`git init`));
	}

	if (nextApp) {
		console.log(
			logSymbols.info,
			chalk.bgGreen.hex(`#000000`).bold(` Next.js App `),
			`with ${chalk.bgGreen.hex(`#000000`).bold(` Tailwind `)}`,
			'created successfully.'
		);

		console.log(`\n${chalk.dim('I suggest that you begin by typing: \n')}`);
		console.log(chalk.cyan(`cd`), `${name}`);
		console.log(chalk.cyan(`git`), `init`);
		console.log(chalk.cyan(`npm run dev`));
	}

	if (reactApp) {
		console.log(
			logSymbols.info,
			chalk.bgGreen.hex(`#000000`).bold(` React.js App `),
			`with ${chalk.bgGreen.hex(`#000000`).bold(` Tailwind `)}`,
			'created successfully.'
		);

		console.log(`\n${chalk.dim('I suggest that you begin by typing: \n')}`);
		console.log(chalk.cyan(`cd`), `${name}`);
		console.log(chalk.cyan(`git`), `init`);
		console.log(chalk.cyan(`npm start`));
	}

	if (gatsbyApp) {
		console.log(
			logSymbols.info,
			chalk.bgGreen.hex(`#000000`).bold(` Gatsby.js App `),
			`with ${chalk.bgGreen.hex(`#000000`).bold(` Tailwind `)}`,
			'created successfully.'
		);

		console.log(`\n${chalk.dim('I suggest that you begin by typing: \n')}`);
		console.log(chalk.cyan(`cd`), `${name}`);
		console.log(chalk.cyan(`git`), `init`);
		console.log(chalk.cyan(`gatsby develop`));
	}

	if (laravelApp) {
		console.log(
			logSymbols.info,
			chalk.bgGreen.hex(`#000000`).bold(` Laravel App `),
			`with ${chalk.bgGreen.hex(`#000000`).bold(` Tailwind `)}`,
			'created successfully.'
		);

		console.log(`\n${chalk.dim('I suggest that you begin by typing: \n')}`);
		console.log(chalk.cyan(`cd`), `${name}`);
		console.log(chalk.cyan(`git`), `init`);
		console.log(chalk.cyan(`php artisan serve`));
	}

	if (vueApp) {
		console.log(
			logSymbols.info,
			chalk.bgGreen.hex(`#000000`).bold(` Vue3 App `),
			`with ${chalk.bgGreen.hex(`#000000`).bold(` Tailwind `)}`,
			'created successfully.'
		);

		console.log(`\n${chalk.dim('I suggest that you begin by typing: \n')}`);
		console.log(chalk.cyan(`cd`), `${name}`);
		console.log(chalk.cyan(`git`), `init`);
		console.log(chalk.cyan(`npm run dev`));
	}

	// create a table
	const table = new cliTable();
	table.push([
		// ' Star '.bold.bgYellow.black,
		`${chalk.bgYellow.hex(`#000000`).bold(` Star `)}`,
		'https://github.com/msaaddev/new-tailwind-app'.grey
	]);
	table.push([
		`${chalk.bgCyan.hex(`#000000`).bold(` Follow `)}`,
		'http://twitter.com/msaaddev'.grey
	]);

	// display table
	console.log('');
	console.log(table.toString());

	await notifyUpdate();

	console.log();
	console.log(
		`${logSymbols.info} ${chalk.dim(
			'Liked my work?! Nominate @msaaddev for GitHub star: https://stars.github.com'
		)}`
	);
	console.log();
};
