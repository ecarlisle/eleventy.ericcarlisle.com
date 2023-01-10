import { defineConfig } from "vite";
import { ViteMinifyPlugin } from "vite-plugin-minify";

export default defineConfig({
	plugins: [
		// input https://www.npmjs.com/package/html-minifier-terser options
		ViteMinifyPlugin({
			collapseWhitespace: true,
			html5: true,
			keepClosingSlash: true,
			removeComments: true,
		}),
	],
});
