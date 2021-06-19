const { command } = require('execa');
const exec = require('node-async-exec');
const handleError = require('node-cli-handle-error');
const ora = require('ora');
const chalk = require('chalk');
const { getPath, laravelTailwind } = require('../../functions/path');

module.exports = async (name, currentDir) => {
	// get nextjs project path
	const { path, isWindows } = getPath(name);
	const tailwindPaths = laravelTailwind(name, currentDir);

	// spinner
	const spinner = ora();

	try {
		spinner.start(`${chalk.bold.dim('Creating a Laravel App...')}`);

		await command(`laravel new ${name}`);

		spinner.succeed(`${chalk.green('Laravel App created.')}`);

		spinner.start(`${chalk.bold.dim('Adding tailwind configurations...')}`);

		await exec({ path, cmd: `npm install` });
		await exec({
			path,
			cmd: `npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
		`
		});

		if (!isWindows) {
			await command(`rm -rf ${tailwindPaths.delWebpackMixJs}`);
			await command(`rm -rf ${tailwindPaths.appCSS}`);
			await command(`rm -rf ${tailwindPaths.appBladePHP}`);
			await command(`cp ${tailwindPaths.tailwindConfig} ${path}`);
			await command(`cp ${tailwindPaths.cpWebpackMixJs} ${path}`);
			await command(
				`cp ${tailwindPaths.cpAppCSS} ${tailwindPaths.destAppCSS}`
			);
			await command(
				`cp ${tailwindPaths.cpAppBladePHP} ${tailwindPaths.destAppBladePHP}`
			);

			await exec({ path, cmd: `npm run dev` });
		} else {
		}

		spinner.succeed(`${chalk.green('Tailwind configurations added.')}`);
	} catch (err) {
		handleError(err);
	}
};
