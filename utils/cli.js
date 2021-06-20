// modules
const handleError = require('node-cli-handle-error');
const basic = require('./apps/basic');
const next = require('./apps/next');
const react = require('./apps/react');
const laravel = require('./apps/laravel');
const gatsby = require('./apps/gatsby');
const vue = require('./apps/vue');

module.exports = async (name, currentDir) => {
	try {
		// await basic(name, currentDir);
		// await next(name, currentDir);
		// await react(name, currentDir);
		// await laravel(name, currentDir);
		// await gatsby(name, currentDir);
		await vue(name, currentDir);
	} catch (err) {
		handleError(err);
	}
};
