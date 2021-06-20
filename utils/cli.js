// modules
const handleError = require('node-cli-handle-error');
const basic = require('./apps/basic');
const next = require('./apps/next');
const react = require('./apps/react');
const laravel = require('./apps/laravel');
const gatsby = require('./apps/gatsby');
const vue = require('./apps/vue');

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
			await basic(name, currentDir);
		}

		// create a next app
		if (nextApp) {
			await next(name, currentDir);
		}

		// create a react app
		if (reactApp) {
			await react(name, currentDir);
		}

		// create a laravel app
		if (laravelApp) {
			await laravel(name, currentDir);
		}

		// create a gatsby app
		if (gatsbyApp) {
			await gatsby(name, currentDir);
		}

		// create a vue3 app
		if (vueApp) {
			await vue(name, currentDir);
		}
	} catch (err) {
		handleError(err);
	}
};
