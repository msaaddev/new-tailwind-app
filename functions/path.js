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

module.exports = {
	getPath,
	basicTailwind
};
