const { command } = require('execa');
const exec = require('node-async-exec');
const handleError = require('../../functions/handleError');
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

		await command(`laravel new --quiet ${name}`);

		spinner.succeed(`${chalk.green('Laravel App created.')}`);

		spinner.start(`${chalk.bold.dim('Adding tailwind configurations...')}`);

		if (!isWindows) {
			// removing existing files
			await command(`rm -rf ${tailwindPaths.delWebpackMixJs}`);
			await command(`rm -rf ${tailwindPaths.appCSS}`);
			await command(`rm -rf ${tailwindPaths.appBladePHP}`);

			// copying tailwind config files
			spinner.start(`${chalk.bold.dim('Creating tailwind configurations...')}`);
			await command(`cp ${tailwindPaths.tailwindConfig} ${path}`);
			await command(`cp ${tailwindPaths.cpWebpackMixJs} ${path}`);
			await command(
				`cp ${tailwindPaths.cpAppCSS} ${tailwindPaths.destAppCSS}`
			);
			await command(
				`cp ${tailwindPaths.cpAppBladePHP} ${tailwindPaths.destAppBladePHP}`
			);
			spinner.succeed(`${chalk.green('Tailwind configurations added.')}`);

		} else {
			// removing existing files
			await command(`del ${tailwindPaths.winDelWebpackMixJs}`);
			await command(`del ${tailwindPaths.winAppCSS}`);
			await command(`del ${tailwindPaths.winAppBladePHP}`);

			// copying tailwind config files
			spinner.start(`${chalk.bold.dim('Creating tailwind configurations...')}`);
			await command(`cp ${tailwindPaths.winTailwindConfig} ${path}`);
			await command(`cp ${tailwindPaths.winCpWebpackMixJs} ${path}`);
			await command(
				`cp ${tailwindPaths.cpAppCSS} ${tailwindPaths.winDestAppCSS}`
			);
			await command(
				`cp ${tailwindPaths.cpAppBladePHP} ${tailwindPaths.winDestAppBladePHP}`
			);
			spinner.succeed(`${chalk.green('Tailwind configurations added.')}`);
		}

		spinner.start(`${chalk.bold.dim('Installing dependencies...')}`);
		await exec({ path, cmd: `npm install` });
		await exec({
			path,
			cmd: `npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
		`
		});
		await exec({ path, cmd: `npm run dev` });
		spinner.succeed(`${chalk.green('Dependencies Installed.')}`);

		spinner.succeed(`${chalk.green('Laravel app created with tailwind integration.')}`);
	} catch (err) {
		spinner.fail(`Couldn't create Laravel Tailwind app.`);
		handleError(name, err, true);
	}
};
