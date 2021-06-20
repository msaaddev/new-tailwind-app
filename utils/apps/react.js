const { command } = require('execa');
const exec = require('node-async-exec');
const writeJsonFile = require('write-json-file');
const ora = require('ora');
const { start, succeed, fail } = require('../../functions/spinner');
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
		start(spinner, `Creating a React.js App...`);

		await command(`npx create-react-app ${name}`);

		succeed(spinner, `React.js App created.`);

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
			// removing index.css
			command(`rm -rf ${tailwindPaths.indexCSS}`);

			// prettier config file
			start(spinner, `Setting up prettier...`);
			command(`cp ${tailwindPaths.prettier} ${path}`);
			succeed(spinner, `prettier config file added.`);

			start(spinner, `Creating tailwind configurations...`);
			command(`cp ${tailwindPaths.craco} ${path}`);
			command(`cp ${tailwindPaths.tailwindConfig} ${path}`);
			command(`cp ${tailwindPaths.cpIndexCSS} ${tailwindPaths.src}`);
			succeed(spinner, `Tailwind configurations added.`);

			// writing content to package.json for tailwind
			start(spinner, `Updating package.json file...`);
			const pkgJSON = require(`${tailwindPaths.pkgJSON}`);
			const tlwPkgJSON = { ...pkgJSON, ...scripts };
			await writeJsonFile(`${tailwindPaths.pkgJSON}`, tlwPkgJSON);
			succeed(spinner, `package.json file updated.`);
		} else {
			// removing index.css
			command(`del ${tailwindPaths.winIndexCSS}`);

			// prettier config file
			start(spinner, `Setting up prettier...`);
			command(`copy ${tailwindPaths.winPrettier} ${path}`);
			succeed(spinner, `prettier config file added.`);

			start(spinner, `Creating tailwind configurations...`);
			command(`copy ${tailwindPaths.winCraco} ${path}`);
			command(`copy ${tailwindPaths.winTailwindConfig} ${path}`);
			command(
				`copy ${tailwindPaths.winCpIndexCSS} ${tailwindPaths.winSrc}`
			);
			succeed(spinner, `Tailwind configurations added.`);

			// writing content to package.json for tailwind
			start(spinner, `Updating package.json file...`);
			const pkgJSON = require(`${tailwindPaths.winPkgJSON}`);
			const tlwPkgJSON = { ...pkgJSON, ...scripts };
			await writeJsonFile(`${tailwindPaths.winPkgJSON}`, tlwPkgJSON);
			succeed(spinner, `package.json file updated.`);
		}

		// installing dependencies
		start(spinner, `Installing dependencies...`);
		await exec({ path, cmd: `npm install @craco/craco` });
		await exec({
			path,
			cmd: `npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 prettier`
		});
		await exec({ path, cmd: `npm run format` });
		succeed(spinner, `Dependencies installed.`);
	} catch (err) {
		fail(spinner, `Couldn't create React.js Tailwind app.`);
		handleError(name, err);
	}
};
