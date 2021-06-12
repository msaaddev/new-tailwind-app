#!/usr/bin/env node

/**
 *
 * Author: Saad Irfan
 * GitHub: msaaddev
 * Twitter: https://twitter.com/msaaddev
 */

// packages
const init = require('./utils/init');
const end = require('./utils/end');

(module.exports = () => {
	init();
	end();
})();
