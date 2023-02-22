/*eslint @typescript-eslint/no-var-requires:0*/
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const environment = process.env.ELEVENTY_ENV;

module.exports = {
	entry: "./src/style/global.scss",
	mode: environment,
	module: {
		rules: [
			{
				test: /\.woff2$/i,
				type: "asset/resource",
				generator: {
					filename: "fonts/[name][ext]",
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "/",
						},
					},
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									require("autoprefixer"),
									require("postcss-sort-media-queries"),
								],
							},
						},
					},
					/*
					{
						loader: "resolve-url-loader",
						options: {
							debug: true,
							root: "/",
						},
					},

					*/
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
	output: {
		path: __dirname + "/_site",
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({ test: /\.js(\?.*)?$/i }),
			new CssMinimizerPlugin({
				minimizerOptions: {
					preset: require.resolve("cssnano-preset-default"),
				},
			}),
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "../dist/css/main.css",
			linkType: false,
		}),
	],
};
