const { command } = require('execa');
const exec = require('node-async-exec');
const writeJsonFile = require('write-json-file');
const ora = require('ora');
const chalk = require('chalk');
const isItGit = require('is-it-git');
const { getPath, nextTailwind } = require('../../functions/path');
const scripts = require('../../template/nextjs/scripts.json');
const handleError = require('../../functions/handleError');

module.exports = async (name, currentDir) => {
	// get nextjs project path
	const { path, isWindows } = getPath(name);
	const tailwindPaths = nextTailwind(name, currentDir);

	// spinner
	const spinner = ora();

	try {
		spinner.start(`${chalk.bold.dim('Creating a Next.js App...')}`);

		await command(`npx create-next-app ${name}`);

		spinner.succeed(`${chalk.green('Next.js App created.')}`);

		// check if directory exists
		const isGitDir = isItGit(path);

		// deleting .git directory
		if (isGitDir) {
			if (!isWindows) {
				await command(`rm -rf ${tailwindPaths.gitDir}`);
			} else {
				await command(`rmdir /Q /S ${tailwindPaths.winGitDir}`);
			}
		}

		if (!isWindows) {
			// prettier config file
			spinner.start(`${chalk.bold.dim('Setting up prettier...')}`);
			command(`cp ${tailwindPaths.prettier} ${path}`);
			spinner.succeed(`${chalk.green('prettier config file added.')}`);


			// copying tailwind config files
			spinner.start(`${chalk.bold.dim('Creating postCSS configurations...')}`);
			command(`cp ${tailwindPaths.postCSSConfig} ${path}`);
			spinner.succeed(`${chalk.green('postCSS configuration file created.')}`);

			spinner.start(`${chalk.bold.dim('Creating tailwind configurations...')}`);
			command(`cp ${tailwindPaths.tailwindConfig} ${path}`);
			spinner.succeed(`${chalk.green('Tailwind configurations added.')}`);

			spinner.start(`${chalk.bold.dim('Updating package.json file...')}`);
			// writing content to package.json for tailwind
			const pkgJSON = require(`${tailwindPaths.pkgJSON}`);
			const tlwPkgJSON = { ...pkgJSON, ...scripts };
			await writeJsonFile(`${tailwindPaths.pkgJSON}`, tlwPkgJSON);
			spinner.succeed(`${chalk.green('package.json file updated.')}`);

			// removing existing files
			spinner.start(`${chalk.bold.dim('Updating Next.js files...')}`);

			await command(`rm -rf ${tailwindPaths.appjsPath}`);
			await command(`rm -rf ${tailwindPaths.globalCSS}`);

			command(`cp ${tailwindPaths.writeAppJS} ${tailwindPaths.pagesDir}`);
			command(
				`cp ${tailwindPaths.writeGlobalCSS} ${tailwindPaths.stylesDir}`
			);

			spinner.succeed(`${chalk.green('Next.js files updated.')}`);
		} else {
			// prettier config file
			spinner.start(`${chalk.bold.dim('Setting up prettier...')}`);
			command(`copy ${tailwindPaths.winPrettier} ${path}`);
			spinner.succeed(`${chalk.green('prettier config file added.')}`);

			// copying tailwind config files
			spinner.start(`${chalk.bold.dim('Creating postCSS configurations...')}`);
			command(`copy ${tailwindPaths.winPostCSSConfig} ${path}`);
			spinner.succeed(`${chalk.green('postCSS configuration file created.')}`);

			spinner.start(`${chalk.bold.dim('Creating tailwind configurations...')}`);
			command(`copy ${tailwindPaths.winTailwindConfig} ${path}`);
			spinner.succeed(`${chalk.green('Tailwind configurations added.')}`);

			// writing content to package.json for tailwind
			spinner.start(`${chalk.bold.dim('Updating package.json file...')}`);
			const pkgJSON = require(`${tailwindPaths.winPkgJSON}`);
			const tlwPkgJSON = { ...pkgJSON, ...scripts };
			await writeJsonFile(`${tailwindPaths.winPkgJSON}`, tlwPkgJSON);
			spinner.succeed(`${chalk.green('package.json file updated.')}`);

			// removing existing files
			spinner.start(`${chalk.bold.dim('Updating Next.js files...')}`);

			await command(`del ${tailwindPaths.winAppjsPath}`);
			await command(`del ${tailwindPaths.winGlobalCSS}`);

			// copying _app.js, global css and prettier
			command(
				`copy ${tailwindPaths.winWriteAppJS} ${tailwindPaths.winPagesDir}`
			);
			command(
				`copy ${tailwindPaths.winWriteGlobalCSS} ${tailwindPaths.winStylesDir}`
			);

			spinner.succeed(`${chalk.green('Next.js files updated.')}`);
		}

		// installing dependencies
		spinner.start(`${chalk.bold.dim('Installing dependencies...')}`);
		await exec({
			path,
			cmd: `npm install -D tailwindcss@latest postcss@latest autoprefixer@latest prettier`
		});
		await exec({ path, cmd: `npm run format` });

		// succeed
		spinner.succeed(`${chalk.green('Dependencies installed.')}`);
		spinner.succeed(`${chalk.green('Next.js app created with tailwind integration.')}`);
	} catch (err) {
		spinner.fail(`Couldn't create Next.js Tailwind app.`);
		handleError(name, err);
	}
};
