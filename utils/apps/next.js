const { command } = require('execa');
const exec = require('node-async-exec');
const writeJsonFile = require('write-json-file');
const handleError = require('node-cli-handle-error');
const ora = require('ora');
const chalk = require('chalk');
const isItGit = require('is-it-git');
const { getPath, nextTailwind } = require('../../functions/path');
const packageJSON = require('../../template/nextjs/package.json');

module.exports = async (name, currentDir) => {
	// get nextjs project path
	const path = getPath(name);
	const tailwindPaths = nextTailwind(name, currentDir);

	// check whether the OS is windows or not
	const isWindows = process.platform === 'win32' ? true : false;

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

		spinner.start(`${chalk.bold.dim('Adding tailwind configurations...')}`);

		// writing content to package.json for tailwind
		const tlwPkgJSON = { ...packageJSON };
		tlwPkgJSON.name = name;
		await writeJsonFile(`${tailwindPaths.pkgJSON}`, tlwPkgJSON);

		if (!isWindows) {
			// copying tailwind config files
			command(`cp ${tailwindPaths.postCSSConfig} ${path}`);
			command(`cp ${tailwindPaths.tailwindConfig} ${path}`);

			// removing existing files
			await command(`rm -rf ${tailwindPaths.appjsPath}`);
			await command(`rm -rf ${tailwindPaths.globalCSS}`);

			command(`cp ${tailwindPaths.writeAppJS} ${tailwindPaths.pagesDir}`);
			command(
				`cp ${tailwindPaths.writeGlobalCSS} ${tailwindPaths.stylesDir}`
			);
		} else {
			// copying tailwind config files
			command(`copy ${tailwindPaths.winPostCSSConfig} ${path}`);
			command(`copy ${tailwindPaths.winTailwindConfig} ${path}`);

			// removing existing files
			await command(`del ${tailwindPaths.winAppjsPath}`);
			await command(`del ${tailwindPaths.winGlobalCSS}`);

			// copying _app.js and global css
			command(
				`copy ${tailwindPaths.winWriteAppJS} ${tailwindPaths.winPagesDir}`
			);
			command(
				`copy ${tailwindPaths.winWriteGlobalCSS} ${tailwindPaths.winStylesDir}`
			);
		}

		// installing dev dependencies
		if (!isWindows) {
			await command(`npm --prefix ${path} install --only=dev`);
			await command(`npm --prefix ${path} run format`);
		} else {
			try {
				await exec({ path, cmd: `npm install --only=dev` });
				await exec({ path, cmd: `npm run format` });
			} catch (err) {
				handleError(err);
			}
		}

		// succeed
		spinner.succeed(`${chalk.green('Tailwind configurations added.')}`);
	} catch (err) {
		spinner.fail(`Couldn't add tailwind configurations.`);
		handleError(`Something went wrong.`, err);
	}
};
