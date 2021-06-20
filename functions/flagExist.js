module.exports = flag => {
	const flags = [
		'--basic',
		'-b',
		'--next',
		'--next.js',
		'-n',
		'--react',
		'--react.js',
		'-r',
		'--gatsby',
		'--gatsby.js',
		'-g',
		'--laravel',
		'-l',
		'--vue3',
		'-v'
	];

	const flagExists = flags.indexOf(flag) === -1 ? false : true;
	return flagExists;
};
