/*eslint @typescript-eslint/no-var-requires:0*/

module.exports = {
	from: "style/global.scss",
	map: false,
	plugins: [
		require("cssnano")({
			preset: "default",
		}),
		require("autoprefixer"),
		require("postcss-sort-media-queries")({
			sort: "mobile-first",
		}),
	],
	syntax: "postcss-scss",
	to: "style/main.css",
};
