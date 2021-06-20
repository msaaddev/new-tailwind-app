// modules
const handleError = require('node-cli-handle-error');
const basic = require('./apps/basic');
const next = require('./apps/next');
const react = require('./apps/react');
const laravel = require('./apps/laravel');
const gatsby = require('./apps/gatsby');
const vue = require('./apps/vue');
const flagExist = require('../functions/flagExist');
const chalk = require('chalk');
const logSymbols = require('log-symbols');

module.exports = async (name, currentDir, app) => {
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

	try {
		// create a basic app
		if (basicApp) {
			return await basic(name, currentDir);
		}

		// create a next app
		if (nextApp) {
			return await next(name, currentDir);
		}

		// create a react app
		if (reactApp) {
			return await react(name, currentDir);
		}

		// create a laravel app
		if (laravelApp) {
			return await laravel(name, currentDir);
		}

		// create a gatsby app
		if (gatsbyApp) {
			return await gatsby(name, currentDir);
		}

		// create a vue3 app
		if (vueApp) {
			return await vue(name, currentDir);
		}

		// unrecognized flag
		if (!flagExist(app)) {
			console.log(
				`\n${logSymbols.error} ${chalk.bgRed
					.hex(`#000000`)
					.bold(` ${app} `)} flag is not recognized.`
			);
			return false;
		}

	} catch (err) {
		handleError(err);
	}
};
