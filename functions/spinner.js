const chalk = require('chalk');

/**
 *
 * @param {spinner} - instance of ora
 * @return {msg} - start message
 */
const start = (spinner, msg) => spinner.start(`${chalk.bold.dim(`${msg}`)}`);

/**
 *
 * @param {spinner} - instance of ora
 * @return {msg} - success message
 */
const succeed = (spinner, msg) => spinner.succeed(`${chalk.green(`${msg}`)}`);

/**
 *
 * @param {spinner} - instance of ora
 * @return {msg} - fail message
 */
const fail = (spinner, msg) => spinner.fail(`${msg}`);

module.exports = {
	start,
	succeed,
	fail
};
