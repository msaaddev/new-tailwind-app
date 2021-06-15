const { command } = require('execa');
const exec = require('node-async-exec');
const writeJsonFile = require('write-json-file');
const ora = require('ora');
const chalk = require('chalk');
const isItGit = require('is-it-git');
const scripts = require('../../template/reactjs/scripts.json');
const { getPath, reactTailwind } = require('../../functions/path');
const handleError = require('../../functions/handleError');

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

		if (!isWindows) {
			// removing index.css
			command(`rm -rf ${tailwindPaths.indexCSS}`);

			// copying config files
			command(`cp ${tailwindPaths.prettier} ${path}`);
			command(`cp ${tailwindPaths.craco} ${path}`);
			command(`cp ${tailwindPaths.tailwindConfig} ${path}`);
			command(`cp ${tailwindPaths.cpIndexCSS} ${tailwindPaths.src}`);

			// writing content to package.json for tailwind
			const pkgJSON = require(`${tailwindPaths.pkgJSON}`);
			const tlwPkgJSON = { ...pkgJSON, ...scripts };
			await writeJsonFile(`${tailwindPaths.pkgJSON}`, tlwPkgJSON);
		} else {
			// removing index.css
			command(`del ${tailwindPaths.indexCSS}`);

			// copying config files
			command(`copy ${tailwindPaths.winPrettier} ${path}`);
			command(`copy ${tailwindPaths.craco} ${path}`);
			command(`copy ${tailwindPaths.tailwindConfig} ${path}`);
			command(`copy ${tailwindPaths.cpIndexCSS} ${tailwindPaths.src}`);

			// writing content to package.json for tailwind
			const pkgJSON = require(`${tailwindPaths.winPkgJSON}`);
			const tlwPkgJSON = { ...pkgJSON, ...scripts };
			await writeJsonFile(`${tailwindPaths.winPkgJSON}`, tlwPkgJSON);
		}

		// installing dependencies
		await exec({ path, cmd: `npm install @craco/craco` });
		await exec({
			path,
			cmd: `npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 prettier`
		});
		await exec({ path, cmd: `npm run format` });

		spinner.succeed(`${chalk.green('Tailwind configurations added.')}`);
	} catch (err) {
		spinner.fail(`Couldn't create React.js Tailwind app.`);
		handleError(name, err);
	}
};
