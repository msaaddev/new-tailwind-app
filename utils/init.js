// packages
const welcome = require('cli-welcome');
const pkgJSON = require('../package.json');
const { Input, Select } = require('enquirer');

/*
 *
 * get app name
 */
const getInput = async () => {
	const prompt = new Input({
		name: 'question',
		message: 'Your app name?',
		hint: 'kebab-case only'
	});

	let answer;

	try {
		answer = await prompt.run();
	} catch (error) {
		console.error(error);
	}
	return answer;
};

/**
 *
 * get app type
 */
const appType = async () => {
	const prompt = new Select({
		message: 'Select App Type',
		choices: [
			'Basic',
			'Next.js',
			'React.js',
			'Gatsby.js',
			'Vue3',
			'Laravel'
		]
	});

	let answer;

	try {
		answer = await prompt.run();
		answer = `--${answer.toLowerCase()}`;
	} catch (error) {
		console.error(error);
	}
	return answer;
};

module.exports = async flags => {
	// welcome header
	welcome({
		title: `${pkgJSON.name}`,
		tagLine: `by ${pkgJSON.author.name}`,
		description: `${pkgJSON.description}`,
		bgColor: `#20B6D2`,
		color: `#000000`,
		bold: true,
		clear: true,
		version: `${pkgJSON.version}`
	});

	let isAppName = false;
	let isAppType = false;

	let name = '';
	let app = '';

	// check for app type from command line arguments
	if (flags.length > 0) {
		const temp = flags[0];
		if (temp[0] === '-' || temp[1] === '-') {
			app = flags[0];
			isAppType = true;
		} else {
			if (flags.length > 1) {
				app = flags[1];
				isAppType = true;
			}
		}
	}

	// separate app name from command line arguments
	for (let i = 0; i < flags.length; i++) {
		let tempName = flags[i];

		if (tempName[0] !== '-' && tempName[1] !== '-') {
			name = tempName;
			isAppName = true;
		}
	}

	// get app name if user has not provided it
	if (!isAppName) {
		while (name === '') {
			name = await getInput();
		}
		isAppType && console.log();
	}

	// get app type if user has not provided it
	if (!isAppType) {
		while (app === '') {
			app = await appType();
		}
		console.log();
	}

	return { name, app };
};
