const { command } = require('execa');
const exec = require('node-async-exec');
const writeJsonFile = require('write-json-file');
const ora = require('ora');
const { start, succeed, fail } = require('../../functions/spinner');
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
		start(spinner, `Creating a Next.js App...`);

		await command(`npx create-next-app ${name}`);

		succeed(spinner, `Next.js App created.`);

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

			// writing content to package.json for tailwind
			start(spinner, `Updating package.json file...`);
			const pkgJSON = require(`${tailwindPaths.pkgJSON}`);
			const tlwPkgJSON = { ...pkgJSON, ...scripts };
			await writeJsonFile(`${tailwindPaths.pkgJSON}`, tlwPkgJSON);
			succeed(spinner, `package.json file updated.`);

			// removing existing files
			start(spinner, `Updating Next.js files...`);

			await command(`rm -rf ${tailwindPaths.appjsPath}`);
			await command(`rm -rf ${tailwindPaths.globalCSS}`);

			command(`cp ${tailwindPaths.writeAppJS} ${tailwindPaths.pagesDir}`);
			command(
				`cp ${tailwindPaths.writeGlobalCSS} ${tailwindPaths.stylesDir}`
			);

			succeed(spinner, `Next.js files updated.`);
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

			// writing content to package.json for tailwind
			start(spinner, `Updating package.json file...`);
			const pkgJSON = require(`${tailwindPaths.winPkgJSON}`);
			const tlwPkgJSON = { ...pkgJSON, ...scripts };
			await writeJsonFile(`${tailwindPaths.winPkgJSON}`, tlwPkgJSON);
			succeed(spinner, `package.json file updated.`);

			// removing existing files
			start(spinner, `Updating Next.js files...`);

			await command(`del ${tailwindPaths.winAppjsPath}`);
			await command(`del ${tailwindPaths.winGlobalCSS}`);

			// copying _app.js, global css and prettier
			command(
				`copy ${tailwindPaths.winWriteAppJS} ${tailwindPaths.winPagesDir}`
			);
			command(
				`copy ${tailwindPaths.winWriteGlobalCSS} ${tailwindPaths.winStylesDir}`
			);

			succeed(spinner, `Next.js files updated.`);
		}

		// installing dependencies
		start(spinner, `Installing dependencies...`);
		await exec({
			path,
			cmd: `npm install -D tailwindcss@latest postcss@latest autoprefixer@latest prettier`
		});
		await exec({ path, cmd: `npm run format` });

		// succeed
		succeed(spinner, `Dependencies installed.`);

		return true;
	} catch (err) {
		fail(spinner, `Couldn't create Next.js Tailwind app.`);
		handleError(name, err);

		return false;
	}
};
