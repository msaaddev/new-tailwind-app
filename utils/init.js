// packages
const welcome = require('cli-welcome');
const pkgJSON = require('../package.json');
const { Input } = require('enquirer');

/*
 *
 * get user question
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

module.exports = async flags => {
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

	let name = '';

	let terminalInput = false;

	for (let i = 0; i < flags.length; i++) {
		let tempName = flags[i];

		if (tempName[0] !== '-' && tempName[1] !== '-') {
			name = tempName;
			terminalInput = true;
			break;
		}
	}

	if (!terminalInput) {
		while (name === '') {
			name = await getInput();
		}
	}

	return name;
};
