#!/usr/bin/env node

/**
 *
 * Author: Saad Irfan
 * GitHub: msaaddev
 * Twitter: https://twitter.com/msaaddev
 */

// packages
const init = require('./utils/init');
const cli = require('./utils/cli');
const end = require('./utils/end');

(module.exports = async () => {
	const currentDir = __dirname;
	let flags = [];
	flags = [...process.argv.slice(2)];
	const name = await init(flags);

	try {
		await cli(name, currentDir);
	} catch (err) {}
	end();
})();
