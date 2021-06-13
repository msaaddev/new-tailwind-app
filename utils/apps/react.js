const { command } = require('execa');
const exec = require('node-async-exec');
const writeJsonFile = require('write-json-file');
const handleError = require('node-cli-handle-error');
const ora = require('ora');
const chalk = require('chalk');
const isItGit = require('is-it-git');
const packageJSON = require('../../template/reactjs/package.json');
const { getPath, reactTailwind } = require('../../functions/path');

module.exports = async (name, currentDir) => {
	// get reactjs project path
	const { path, isWindows } = getPath(name);
	const tailwindPaths = reactTailwind(name, currentDir);

	// spinner
	const spinner = ora();

	try {
		spinner.start(`${chalk.bold.dim('Creating a React.js App...')}`);

		await command(`npx create-react-app ${name}`);

		spinner.succeed(`${chalk.green('React.js App created.')}`);

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
			// removing index.css
			command(`rm -rf ${tailwindPaths.indexCSS}`);

			// copying config files
			command(`cp ${tailwindPaths.craco} ${path}`);
			command(`cp ${tailwindPaths.tailwindConfig} ${path}`);
			command(`cp ${tailwindPaths.cpIndexCSS} ${tailwindPaths.src}`);

			// installing dependencies
			await command(`npm --prefix ${path} install`);
			await command(`npm --prefix ${path} install --only=dev`);
			await command(`npm --prefix ${path} run format`);
		} else {
			// removing index.css
			command(`del ${tailwindPaths.indexCSS}`);

			// copying config files
			command(`copy ${tailwindPaths.craco} ${path}`);
			command(`copy ${tailwindPaths.tailwindConfig} ${path}`);
			command(`copy ${tailwindPaths.cpIndexCSS} ${tailwindPaths.src}`);

			// installing dependencies
			await exec({ path, cmd: `npm install` });
			await exec({ path, cmd: `npm install --only=dev` });
			await exec({ path, cmd: `npm run format` });
		}

		spinner.succeed(`${chalk.green('Tailwind configurations added.')}`);
	} catch (err) {
		spinner.fail(`Couldn't add tailwind configurations.`);
		handleError(err);
	}
};
