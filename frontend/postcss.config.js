const postcssPresetEnv = require('postcss-preset-env');
const stylelint = require('stylelint');
const stylelintConfig = require('./.stylelintrc.json');

module.exports = {
		plugins: [
				require('autoprefixer'),
				postcssPresetEnv({ stage: 4 }),
				stylelint(stylelintConfig)
		]
}