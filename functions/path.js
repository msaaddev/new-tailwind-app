const cwd = process.cwd();

/**
 *
 * @param {name} - name of the directory
 */
const getPath = name => {
	const slash = '\\';

	// check whether the OS is windows or not
	const isWindows = process.platform === 'win32' ? true : false;

	if (isWindows) return `${cwd}${slash}${name}`;
	return `${cwd}/${name}`;
};

/**
 *
 * @param {name} - name of the directory
 * @param {currentDir} - path of the directory from where CLI is running
 */
const basicTailwind = (name, currentDir) => {
	const slash = '\\';
	const path = getPath(name);

	return {
		dist: `${currentDir}/template/basic/dist`,
		src: `${currentDir}/template/basic/src`,
		pkgJSON: `${currentDir}/template/basic/package.json`,
		destPkgJSON: `${path}/package.json`,
		gitIgnore: `${currentDir}/.gitignore`,
		winDist: `${currentDir}${slash}template${slash}basic${slash}dist`,
		winSrc: `${currentDir}${slash}template${slash}basic${slash}src`,
		winPkgJSON: `${currentDir}${slash}template${slash}basic${slash}package.json`,
		winDestPkgJSON: `${path}${slash}package.json`,
		winGitIgnore: `${currentDir}${slash}.gitignore`
	};
};

/**
 *
 * @param {name} - name of the directory
 * @param {currentDir} - path of the directory from where CLI is running
 */
const nextTailwind = (name, currentDir) => {
	const path = getPath(name);
	const slash = '\\';

	return {
		gitDir: `${path}/.git`,
		winGitDir: `${path}${slash}.git`,
		pkgJSON: `${path}/package.json`,
		winPkgJSON: `${path}${slash}package.json`,
		postCSSConfig: `${currentDir}/template/nextjs/postcss.config.js`,
		winPostCSSConfig: `${currentDir}${slash}template${slash}nextjs${slash}postcss.config.js`,
		tailwindConfig: `${currentDir}/template/nextjs/tailwind.config.js`,
		winTailwindConfig: `${currentDir}${slash}template${slash}nextjs${slash}tailwind.config.js`,
		appjsPath: `${path}/pages/_app.js`,
		winAppjsPath: `${path}${slash}pages${slash}_app.js`,
		globalCSS: `${path}/styles/globals.css`,
		winGlobalCSS: `${path}${slash}styles${slash}globals.css`,
		writeAppJS: `${currentDir}/template/nextjs/_app.js`,
		winWriteAppJS: `${currentDir}${slash}template${slash}nextjs${slash}_app.js`,
		writeGlobalCSS: `${currentDir}/template/nextjs/globals.css`,
		winWriteGlobalCSS: `${currentDir}${slash}template${slash}nextjs${slash}globals.css`,
		pagesDir: `${path}/pages`,
		winPagesDir: `${path}${slash}pages`,
		stylesDir: `${path}/styles`,
		winStylesDir: `${path}${slash}styles`
	};
};

module.exports = {
	getPath,
	basicTailwind,
	nextTailwind
};
