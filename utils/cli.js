// modules
const handleError = require('node-cli-handle-error');
const basic = require('./apps/basic');
const next = require('./apps/next');
const react = require('./apps/react');

module.exports = async (name, currentDir) => {
	console.log();
	try {
		// await basic(name, currentDir);
		// await next(name, currentDir);
		await react(name, currentDir);
	} catch (err) {
		handleError(err);
	}
};
