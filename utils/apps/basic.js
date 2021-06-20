const { command } = require('execa');
const exec = require('node-async-exec');
const writeJsonFile = require('write-json-file');
const ora = require('ora');
const { start, succeed, fail } = require('../../functions/spinner');
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

		start(spinner, `Creating a ${name} directory...`);

		// copy template
		await command(`mkdir ${name}`);

		succeed(spinner, `${name} directory created.`);

		if (!isWindows) {
			start(spinner, `Creating dist directory...`);

			await command(`cp -R ${basicTailwindPaths.dist} ${path}`);

			succeed(spinner, `dist directory created.`);

			start(spinner, `Creating src directory...`);

			await command(`cp -R ${basicTailwindPaths.src} ${path}`);

			succeed(spinner, `src directory created.`);

			start(spinner, `Creating package.json file...`);

			await command(`cp ${basicTailwindPaths.pkgJSON} ${path}`);
			await command(`cp ${basicTailwindPaths.gitIgnore} ${path}`);

			succeed(spinner, `package.json file created.`);

			// writing to package.json
			await writeJsonFile(
				`${basicTailwindPaths.destPkgJSON}`,
				bTlwPkgJSON
			);
		} else {
			// copy template

			start(spinner, `Creating dist directory...`);

			await command(`xcopy ${basicTailwindPaths.winDist} ${path} /H`);

			succeed(spinner, `dist directory created.`);

			start(spinner, `Creating src directory...`);

			await command(`xcopy ${basicTailwindPaths.winSrc} ${path} /H`);

			succeed(spinner, `src directory created.`);

			start(spinner, `Creating package.json file...`);

			await command(`copy ${basicTailwindPaths.winPkgJSON} ${path}`);
			await command(`copy ${basicTailwindPaths.winGitIgnore} ${path}`);

			succeed(spinner, `package.json file created.`);

			// writing to package.json
			await writeJsonFile(
				`${basicTailwindPaths.winDestPkgJSON}`,
				bTlwPkgJSON
			);
		}

		start(spinner, `Installing dependencies...`);

		// installing dependencies
		await exec({ path, cmd: `npm install tailwindcss` });

		succeed(spinner, `Dependencies installed.`);

		start(spinner, `Generating Tailwind build...`);

		// generating tailwind build
		await exec({ path, cmd: `npm run build:css` });

		succeed(spinner, `Build generated successfully.`);

		return true;
	} catch (err) {
		fail(spinner, `Couldn't create basic Tailwind app.`);
		handleError(name, err);

		return false;
	}
};
