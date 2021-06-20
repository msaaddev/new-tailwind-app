const { command } = require('execa');
const exec = require('node-async-exec');
const writeJsonFile = require('write-json-file');
const ora = require('ora');
const chalk = require('chalk');
const { getPath, basicTailwind } = require('../../functions/path');
const packageJSON = require('../../template/basic/package.json');
const handleError = require('../../functions/handleError');

module.exports = async (name, currentDir) => {
	//  get paths for basic tailwind app
	const { path, isWindows } = getPath(name);
	const basicTailwindPaths = basicTailwind(name, currentDir);

	// spinner
	const spinner = ora();

	try {
		// write json file
		const bTlwPkgJSON = { ...packageJSON };
		bTlwPkgJSON.name = name;

		spinner.start(`${chalk.bold.dim(`Creating a ${name} directory...`)}`);

		// copy template
		await command(`mkdir ${name}`);

		spinner.succeed(`${chalk.green(`${name} directory created.`)}`);

		if (!isWindows) {
			spinner.start(`${chalk.bold.dim(`Creating dist directory...`)}`);

			await command(`cp -R ${basicTailwindPaths.dist} ${path}`);

			spinner.succeed(`${chalk.green(`dist directory created.`)}`);

			spinner.start(`${chalk.bold.dim(`Creating src directory...`)}`);

			await command(`cp -R ${basicTailwindPaths.src} ${path}`);

			spinner.succeed(`${chalk.green(`src directory created.`)}`);

			spinner.start(`${chalk.bold.dim(`Creating package.json file...`)}`);
			await command(`cp ${basicTailwindPaths.pkgJSON} ${path}`);
			await command(`cp ${basicTailwindPaths.gitIgnore} ${path}`);

			spinner.succeed(`${chalk.green(`package.json file created.`)}`);

			// writing to package.json
			await writeJsonFile(
				`${basicTailwindPaths.destPkgJSON}`,
				bTlwPkgJSON
			);
		} else {
			// copy template

			spinner.start(`${chalk.bold.dim(`Creating dist directory...`)}`);
			await command(`xcopy ${basicTailwindPaths.winDist} ${path} /H`);
			spinner.start(`${chalk.bold.dim(`Creating dist directory...`)}`);

			spinner.start(`${chalk.bold.dim(`Creating src directory...`)}`);
			await command(`xcopy ${basicTailwindPaths.winSrc} ${path} /H`);
			spinner.succeed(`${chalk.green(`src directory created.`)}`);

			spinner.start(`${chalk.bold.dim(`Creating package.json file...`)}`);
			await command(`copy ${basicTailwindPaths.winPkgJSON} ${path}`);
			await command(`copy ${basicTailwindPaths.winGitIgnore} ${path}`);
			spinner.succeed(`${chalk.green(`package.json file updated.`)}`);

			// writing to package.json
			await writeJsonFile(
				`${basicTailwindPaths.winDestPkgJSON}`,
				bTlwPkgJSON
			);
		}

		spinner.succeed(`${chalk.green('Basic Tailwind App created.')}`);

		spinner.start(`${chalk.bold.dim('Installing dependencies...')}`);

		// installing dependencies
		await exec({ path, cmd: `npm install tailwindcss` });

		spinner.succeed(`${chalk.green('Dependencies installed.')}`);

		spinner.start(`${chalk.bold.dim('Generating Tailwind build...')}`);

		// generating tailwind build
		await exec({ path, cmd: `npm run build:css` });

		spinner.succeed(`${chalk.green('Build generated successfully.')}`);
	} catch (err) {
		spinner.fail(`Couldn't create basic Tailwind app.`);
		handleError(name, err);
	}
};
