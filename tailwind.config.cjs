const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	daisyui: {
		themes: ['lemonade']
	},

	plugins: [require('daisyui')]
};

module.exports = config;
