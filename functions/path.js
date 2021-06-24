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
		winBasic: `${currentDir}${slash}template${slash}basic`,
		winDestPkgJSON: `${path}${slash}package.json`,
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
		winStylesDir: `${path}${slash}styles`,
		prettier: `${currentDir}/template/nextjs/.prettierrc.json`,
		winPrettier: `${currentDir}${slash}template${slash}nextjs${slash}.prettierrc.json`
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
		winCpIndexCSS: `${currentDir}${slash}template${slash}reactjs${slash}index.css`,
		src: `${path}/src`,
		winSrc: `${path}${slash}src`,
		prettier: `${currentDir}/template/reactjs/.prettierrc.json`,
		winPrettier: `${currentDir}${slash}template${slash}reactjs${slash}.prettierrc.json`
	};
};

/**
 *
 *
 * @param {name} - name of the directory
 * @param {currentDir} - path of the directory from where CLI is running
 * @return {object} - path of laravel tailwind apps
 */
const laravelTailwind = (name, currentDir) => {
	const { path } = getPath(name);
	const slash = '\\';

	return {
		tailwindConfig: `${currentDir}/template/laravel/tailwind.config.js`,
		winTailwindConfig: `${currentDir}${slash}template${slash}laravel${slash}tailwind.config.js`,
		delWebpackMixJs: `${path}/webpack.mix.js`,
		winDelWebpackMixJs: `${path}${slash}webpack.mix.js`,
		cpWebpackMixJs: `${currentDir}/template/laravel/webpack.mix.js`,
		winCpWebpackMixJs: `${currentDir}${slash}template${slash}laravel${slash}webpack.mix.js`,
		appCSS: `${path}/resources/css/app.css`,
		winAppCSS: `${path}${slash}resources${slash}css${slash}app.css`,
		cpAppCSS: `${currentDir}/template/laravel/app.css`,
		winCpAppCSS: `${currentDir}${slash}template${slash}laravel${slash}app.css`,
		destAppCSS: `${path}/resources/css`,
		winDestAppCSS: `${path}${slash}resources${slash}css`,
		appBladePHP: `${path}/resources/views/welcome.blade.php`,
		winAppBladePHP: `${path}${slash}resources${slash}views${slash}welcome.blade.php`,
		cpAppBladePHP: `${currentDir}/template/laravel/welcome.blade.php`,
		winCpAppBladePHP: `${currentDir}${slash}template${slash}laravel${slash}welcome.blade.php`,
		destAppBladePHP: `${path}/resources/views`,
		winDestAppBladePHP: `${path}${slash}resources${slash}views`
	};
};

/**
 *
 *
 * @param {name} - name of the directory
 * @param {currentDir} - path of the directory from where CLI is running
 * @return {object} - path of gatsby tailwind apps
 */
const gatsbyTailwind = (name, currentDir) => {
	const { path } = getPath(name);
	const slash = '\\';

	return {
		prettier: `${currentDir}/template/gatsby/.prettierrc.json`,
		winPrettier: `${currentDir}${slash}template${slash}gatsby${slash}.prettierrc.json`,
		delPrettier: `${path}/.prettierrc`,
		winDelPrettier: `${path}${slash}.prettierrc`,
		gitDir: `${path}/.git`,
		winGitDir: `${path}${slash}.git`,
		postCSSConfig: `${currentDir}/template/gatsby/postcss.config.js`,
		winPostCSSConfig: `${currentDir}${slash}template${slash}gatsby${slash}postcss.config.js`,
		tailwindConfig: `${currentDir}/template/gatsby/tailwind.config.js`,
		winTailwindConfig: `${currentDir}${slash}template${slash}gatsby${slash}tailwind.config.js`,
		gatsbyConfig: `${path}/gatsby-config.js`,
		winGatsbyConfig: `${path}${slash}gatsby-config.js`,
		cpGatsbyConfig: `${currentDir}/template/gatsby/gatsby-config.js`,
		winCpGatsbyConfig: `${currentDir}${slash}template${slash}gatsby${slash}gatsby-config.js`,
		globalCSS: `${path}/src/styles/global.css`,
		winGlobalCSS: `${path}${slash}src${slash}styles${slash}global.css`,
		destGlobalCSS: `${path}/src/styles`,
		winDestGlobalCSS: `${path}${slash}src${slash}styles`,
		cpGlobalCSS: `${currentDir}/template/gatsby/global.css`,
		winCpGlobalCSS: `${currentDir}${slash}template${slash}gatsby${slash}global.css`,
		gatsbyBrowser: `${path}/gatsby-browser.js`,
		winGatsbyBrowser: `${path}${slash}gatsby-browser.js`,
		cpGatsbyBrowser: `${currentDir}/template/gatsby/gatsby-browser.js`,
		winCpGatsbyBrowser: `${currentDir}${slash}template${slash}gatsby${slash}gatsby-browser.js`
	};
};

/**
 *
 *
 * @param {name} - name of the directory
 * @param {currentDir} - path of the directory from where CLI is running
 * @return {object} - path of vue3 tailwind apps
 */
const vue3Tailwind = (name, currentDir) => {
	const { path } = getPath(name);
	const slash = '\\';

	return {
		prettier: `${currentDir}/template/vue/.prettierrc.json`,
		winPrettier: `${currentDir}${slash}template${slash}vue${slash}.prettierrc.json`,
		postCSSConfig: `${currentDir}/template/vue/postcss.config.js`,
		winPostCSSConfig: `${currentDir}${slash}template${slash}vue${slash}postcss.config.js`,
		tailwindConfig: `${currentDir}/template/vue/tailwind.config.js`,
		winTailwindConfig: `${currentDir}${slash}template${slash}vue${slash}tailwind.config.js`,
		src: `${path}/src`,
		winSrc: `${path}${slash}src`,
		cpIndexCSS: `${currentDir}/template/vue/index.css`,
		winCpIndexCSS: `${currentDir}${slash}template${slash}vue3${slash}index.css`,
		pkgJSON: `${path}/package.json`,
		winPkgJSON: `${path}${slash}package.json`,
		mainJs: `${path}/src/main.js`,
		winMainJs: `${path}${slash}src${slash}main.js`,
		cpMainJS: `${currentDir}/template/vue/main.js`,
		winCpMainJS: `${currentDir}${slash}template${slash}vue${slash}main.js`
	};
};

module.exports = {
	getPath,
	basicTailwind,
	nextTailwind,
	reactTailwind,
	laravelTailwind,
	gatsbyTailwind,
	vue3Tailwind
};
