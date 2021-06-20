const { command } = require('execa');
const exec = require('node-async-exec');
const ora = require('ora');
const writeJsonFile = require('write-json-file');
const { start, succeed, fail } = require('../../functions/spinner');
const { getPath, vue3Tailwind } = require('../../functions/path');
const handleError = require('../../functions/handleError');
const logSymbols = require('log-symbols');
const chalk = require('chalk');
const fs = require('fs');
const scripts = require('../../template/vue/scripts.json');

module.exports = async (name, currentDir) => {
	// get reactjs project path
	const { path, isWindows } = getPath(name);
	const tailwindPaths = vue3Tailwind(name, currentDir);

	// spinner
	const spinner = ora();

	try {
		// check if directory exists
		const filenames = fs.readdirSync(process.cwd());
		const isDirExist = filenames.indexOf(`${name}`) !== -1 ? true : false;

		if (isDirExist) {
			throw err;
		}

		// setting up gatsby project
		start(spinner, `Creating a Vue3 App...`);

		await command(`npx @vitejs/create-app ${name} --template vue`);

		succeed(spinner, `Vue3 App created.`);

		if (!isWindows) {
			// prettier config file
			start(spinner, `Setting up prettier...`);
			command(`cp ${tailwindPaths.prettier} ${path}`);
			succeed(spinner, `prettier config file added.`);

			// copying tailwind config files
			start(spinner, `Creating postCSS configurations...`);
			command(`cp ${tailwindPaths.postCSSConfig} ${path}`);
			succeed(spinner, `postCSS configuration file created.`);

			start(spinner, `Creating tailwind configurations...`);
			command(`cp ${tailwindPaths.tailwindConfig} ${path}`);
			succeed(spinner, `Tailwind configurations added.`);

			start(spinner, `Updating vue3 config files...`);
			command(`rm -rf ${tailwindPaths.mainJs}`);
			command(`cp ${tailwindPaths.cpMainJS} ${tailwindPaths.src}`);
			command(`cp ${tailwindPaths.cpIndexCSS} ${tailwindPaths.src}`);

			const pkgJSON = require(`${tailwindPaths.pkgJSON}`);
			const tlwPkgJSON = { ...pkgJSON, ...scripts };
			await writeJsonFile(`${tailwindPaths.pkgJSON}`, tlwPkgJSON);
			succeed(spinner, `vue3 config files updated.`);
		} else {
			// prettier config file
			start(spinner, `Setting up prettier...`);
			command(`copy ${tailwindPaths.winPrettier} ${path}`);
			succeed(spinner, `prettier config file added.`);

			// copying tailwind config files
			start(spinner, `Creating postCSS configurations...`);
			command(`copy ${tailwindPaths.winPostCSSConfig} ${path}`);
			succeed(spinner, `postCSS configuration file created.`);

			start(spinner, `Creating tailwind configurations...`);
			command(`copy ${tailwindPaths.winTailwindConfig} ${path}`);
			succeed(spinner, `Tailwind configurations added.`);

			start(spinner, `Updating vue3 config files...`);
			command(`del ${tailwindPaths.winMainJs}`);
			command(
				`copy ${tailwindPaths.winCpMainJS} ${tailwindPaths.winSrc}`
			);
			command(
				`copy ${tailwindPaths.winCpIndexCSS} ${tailwindPaths.winSrc}`
			);

			const pkgJSON = require(`${tailwindPaths.winPkgJSON}`);
			const tlwPkgJSON = { ...pkgJSON, ...scripts };
			await writeJsonFile(`${tailwindPaths.winPkgJSON}`, tlwPkgJSON);
			succeed(spinner, `Vue3 config files updated.`);
		}

		// installing dependencies
		start(spinner, `Installing dependencies...`);
		await exec({
			path,
			cmd: `npm install -D tailwindcss@latest postcss@latest autoprefixer@latest prettier
		`
		});
		await exec({ path, cmd: `npm run format` });
		succeed(spinner, `Dependencies installed.`);

		return true;
	} catch (err) {
		fail(spinner, `Couldn't create Vue3 Tailwind app.`);
		handleError(name, err);

		return false;
	}
};
