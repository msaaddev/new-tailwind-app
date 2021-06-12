const execa = require('execa');
const exec = require('node-async-exec');
const writeJsonFile = require('write-json-file');
const handleError = require('node-cli-handle-error');
const ora = require('ora');
const chalk = require('chalk');
const { getPath, basicTailwind } = require('../functions/path');
const packageJSON = require('../template/basic/package.json');

module.exports = async (name, currentDir) => {
	//  get paths for basic tailwind app
	const path = getPath(name);
	const basicTailwindPaths = basicTailwind(name, currentDir);

	// check whether the OS is windows or not
	const isWindows = process.platform === 'win32' ? true : false;

	// spinner
	const spinner = ora();

	try {
		spinner.start(`${chalk.bold.dim('Creating a basic Tailwind App...')}`);

		if (!isWindows) {
			// copy template
			await execa.command(`mkdir ${name}`);
			await execa.command(`cp -R ${basicTailwindPaths.dist} ${path}`);
			await execa.command(`cp -R ${basicTailwindPaths.src} ${path}`);
			await execa.command(`cp ${basicTailwindPaths.pkgJSON} ${path}`);
			await execa.command(`cp ${basicTailwindPaths.gitIgnore} ${path}`);

			// write json file
			const bTlwPkgJSON = { ...packageJSON };
			bTlwPkgJSON.name = name;
			await writeJsonFile(
				`${basicTailwindPaths.destPkgJSON}`,
				bTlwPkgJSON
			);
		} else {
			// copy template
			await execa.command(`mkdir ${name}`);
			await execa.command(
				`xcopy ${basicTailwindPaths.winDist} ${path} /H`
			);
			await execa.command(
				`xcopy ${basicTailwindPaths.winSrc} ${path} /H`
			);
			await execa.command(
				`copy ${basicTailwindPaths.winPkgJSON} ${path}`
			);
			await execa.command(
				`copy ${basicTailwindPaths.winGitIgnore} ${path}`
			);

			// write json file
			const bTlwPkgJSON = { ...packageJSON };
			bTlwPkgJSON.name = name;
			await writeJsonFile(
				`${basicTailwindPaths.winDestPkgJSON}`,
				bTlwPkgJSON
			);
		}

		spinner.succeed(`${chalk.green('Tailwind App created.')}`);

		spinner.start(`${chalk.bold.dim('Installing dependencies...')}`);

		// installing dependencies
		await exec({ path, cmd: `npm install` });

		spinner.succeed(`${chalk.green('Dependencies installed.')}`);

		spinner.start(`${chalk.bold.dim('Generating Tailwind build...')}`);

		// generating tailwind build
		await exec({ path, cmd: `npm run build:css` });

		spinner.succeed(`${chalk.green('Build generated successfully.')}`);
	} catch (err) {
		spinner.fail(`Couldn't create basic Tailwind app.`);
		handleError(err);
	}
};
