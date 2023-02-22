module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"prettier",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	ignorePatterns: ["_site/**/*"],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
	},
	plugins: ["prettier", "react", "@typescript-eslint"],
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		"prettier/prettier": ["error"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
};
