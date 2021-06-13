const cwd = process.cwd();

/**
 *
 *
 * @param {name} - name of the directory
 * @return {object} - containing platform and path of the newly created project
 */
const getPath = name => {
	const slash = '\\';

	// check whether the OS is windows or not
	const isWindows = process.platform === 'win32' ? true : false;

	if (isWindows) return { path: `${cwd}${slash}${name}`, isWindows };
	return { path: `${cwd}/${name}`, isWindows };
};

/**
 *
 *
 * @param {name} - name of the directory
 * @param {currentDir} - path of the directory from where CLI is running
 * @return {object} - path of basic tailwind app
 */
const basicTailwind = (name, currentDir) => {
	const slash = '\\';
	const { path } = getPath(name);

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
 *
 * @param {name} - name of the directory
 * @param {currentDir} - path of the directory from where CLI is running
 * @return {object} - path of nextjs tailwind app
 */
const nextTailwind = (name, currentDir) => {
	const { path } = getPath(name);
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

/**
 *
 *
 * @param {name} - name of the directory
 * @param {currentDir} - path of the directory from where CLI is running
 * @return {object} - path of reactjs tailwind app
 */
const reactTailwind = (name, currentDir) => {
	const { path } = getPath(name);
	const slash = '\\';

	return {
		gitDir: `${path}/.git`,
		winGitDir: `${path}${slash}.git`,
		pkgJSON: `${path}/package.json`,
		winPkgJSON: `${path}${slash}package.json`,
		craco: `${currentDir}/template/reactjs/craco.config.js`,
		winCraco: `${currentDir}${slash}template${slash}reactjs${slash}craco.config.js`,
		tailwindConfig: `${currentDir}/template/reactjs/tailwind.config.js`,
		winTailwindConfig: `${currentDir}${slash}template${slash}reactjs${slash}tailwind.config.js`,
		indexCSS: `${path}/src/index.css`,
		winIndexCSS: `${path}${slash}src${slash}index.css`,
		cpIndexCSS: `${currentDir}/template/reactjs/index.css`,
		WinCpIndexCSS: `${currentDir}${slash}template${slash}reactjs${slash}index.css`,
		src: `${path}/src`,
		winSrc: `${path}${slash}src`
	};
};

module.exports = {
	getPath,
	basicTailwind,
	nextTailwind,
	reactTailwind
};
