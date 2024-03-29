const { command } = require('execa');
const exec = require('node-async-exec');
const ora = require('ora');
const { start, succeed, fail } = require('../../functions/spinner');
const isItGit = require('is-it-git');
const { getPath, gatsbyTailwind } = require('../../functions/path');
const handleError = require('../../functions/handleError');

module.exports = async (name, currentDir, integratePrettier) => {
	// get reactjs project path
	const { path, isWindows } = getPath(name);
	const tailwindPaths = gatsbyTailwind(name, currentDir);

	// spinner
	const spinner = ora();

	try {
		// setting up gatsby project
		start(spinner, `Creating a Gatsby.js App...`);

		await command(`npx gatsby-cli new ${name}`);

		succeed(spinner, `Gatsby.js App created.`);

		// check if directory exists
		const isGitDir = isItGit(path);

		// deleting .git directory
		if (isGitDir) {
			if (!isWindows) {
				await command(`rm -rf ${tailwindPaths.gitDir}`);
			}
		}

		if (!isWindows) {
			command(`rm -rf ${tailwindPaths.delPrettier}`);

			if (integratePrettier) {
				// prettier config file
				start(spinner, `Setting up prettier...`);
				command(`cp ${tailwindPaths.prettier} ${path}`);
				succeed(spinner, `prettier config file added.`);
			}

			// copying tailwind config files
			start(spinner, `Creating postCSS configurations...`);
			command(`cp ${tailwindPaths.postCSSConfig} ${path}`);
			succeed(spinner, `postCSS configuration file created.`);

			start(spinner, `Creating tailwind configurations...`);
			command(`cp ${tailwindPaths.tailwindConfig} ${path}`);
			succeed(spinner, `Tailwind configurations added.`);

			// updating gatsby config
			start(spinner, `Updating gatsby config files...`);
			command(`rm -rf ${tailwindPaths.gatsbyConfig}`);
			command(`rm -rf ${tailwindPaths.gatsbyBrowser}`);
			command(`cp ${tailwindPaths.cpGatsbyConfig} ${path}`);
			command(`cp ${tailwindPaths.cpGatsbyBrowser} ${path}`);

			// global css
			await exec({ path: `${path}/src`, cmd: `mkdir styles` });
			command(
				`cp ${tailwindPaths.cpGlobalCSS} ${tailwindPaths.destGlobalCSS}`
			);
			succeed(spinner, `Gatsby config files updated.`);
		} else {
			command(`del ${tailwindPaths.winDelPrettier}`);

			if (integratePrettier) {
				// prettier config file
				start(spinner, `Setting up prettier...`);
				command(`copy ${tailwindPaths.winPrettier} ${path}`);
				succeed(spinner, `prettier config file added.`);
			}

			// copying tailwind config files
			start(spinner, `Creating postCSS configurations...`);
			command(`copy ${tailwindPaths.winPostCSSConfig} ${path}`);
			succeed(spinner, `postCSS configuration file created.`);

			start(spinner, `Creating tailwind configurations...`);
			command(`copy ${tailwindPaths.winTailwindConfig} ${path}`);
			succeed(spinner, `Tailwind configurations added.`);

			// updating gatsby config
			start(spinner, `Updating gatsby config files...`);
			command(`del ${tailwindPaths.winGatsbyConfig}`);
			command(`del ${tailwindPaths.winGatsbyBrowser}`);
			command(`copy ${tailwindPaths.winCpGatsbyConfig} ${path}`);
			command(`copy ${tailwindPaths.winCpGatsbyBrowser} ${path}`);

			// global css
			await exec({ path: `${path}\\src`, cmd: `mkdir styles` });
			command(
				`copy ${tailwindPaths.winCpGlobalCSS} ${tailwindPaths.winDestGlobalCSS}`
			);
			succeed(spinner, `Gatsby config files updated.`);
		}

		const package = integratePrettier ? `prettier` : ``;

		// installing dependencies
		start(spinner, `Installing dependencies...`);
		await exec({
			path,
			cmd: `npm install -D gatsby-plugin-postcss tailwindcss@latest postcss@latest autoprefixer@latest ${package}
		`
		});
		integratePrettier && (await exec({ path, cmd: `npm run format` }));
		succeed(spinner, `Dependencies installed.`);

		return true;
	} catch (err) {
		fail(spinner, `Couldn't create Gatsby Tailwind app.`);
		handleError(name, err);

		return false;
	}
};
