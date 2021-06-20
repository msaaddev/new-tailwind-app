const { command } = require('execa');
const exec = require('node-async-exec');
const handleError = require('../../functions/handleError');
const ora = require('ora');
const { start, succeed, fail } = require('../../functions/spinner');
const { getPath, laravelTailwind } = require('../../functions/path');

module.exports = async (name, currentDir) => {
	// get nextjs project path
	const { path, isWindows } = getPath(name);
	const tailwindPaths = laravelTailwind(name, currentDir);

	// spinner
	const spinner = ora();

	try {
		start(spinner, `Creating a Laravel App...`);

		await command(`laravel new --quiet ${name}`);

		succeed(spinner, `Laravel App created.`);

		if (!isWindows) {
			// removing existing files
			await command(`rm -rf ${tailwindPaths.delWebpackMixJs}`);
			await command(`rm -rf ${tailwindPaths.appCSS}`);
			await command(`rm -rf ${tailwindPaths.appBladePHP}`);

			// copying tailwind config files
			start(spinner, `Creating tailwind configurations...`);
			await command(`cp ${tailwindPaths.tailwindConfig} ${path}`);
			await command(`cp ${tailwindPaths.cpWebpackMixJs} ${path}`);
			await command(
				`cp ${tailwindPaths.cpAppCSS} ${tailwindPaths.destAppCSS}`
			);
			await command(
				`cp ${tailwindPaths.cpAppBladePHP} ${tailwindPaths.destAppBladePHP}`
			);
			succeed(spinner, `Tailwind configurations added.`);
		} else {
			// removing existing files
			await command(`del ${tailwindPaths.winDelWebpackMixJs}`);
			await command(`del ${tailwindPaths.winAppCSS}`);
			await command(`del ${tailwindPaths.winAppBladePHP}`);

			// copying tailwind config files
			start(spinner, `Creating tailwind configurations...`);
			await command(`copy ${tailwindPaths.winTailwindConfig} ${path}`);
			await command(`copy ${tailwindPaths.winCpWebpackMixJs} ${path}`);
			await command(
				`copy ${tailwindPaths.cpAppCSS} ${tailwindPaths.winDestAppCSS}`
			);
			await command(
				`copy ${tailwindPaths.cpAppBladePHP} ${tailwindPaths.winDestAppBladePHP}`
			);
			succeed(spinner, `Tailwind configurations added.`);
		}

		start(spinner, `Installing dependencies...`);
		await exec({ path, cmd: `npm install` });
		await exec({
			path,
			cmd: `npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
		`
		});
		await exec({ path, cmd: `npm run dev` });
		succeed(spinner, `Dependencies Installed.`);

		return true;
	} catch (err) {
		fail(spinner, `Couldn't create laravel Tailwind app.`);
		handleError(name, err, true);

		return false;
	}
};
