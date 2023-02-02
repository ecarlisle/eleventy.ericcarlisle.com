const { DateTime } = require("luxon");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const eleventyPluginFilesMinifier = require("@sherby/eleventy-plugin-files-minifier");
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const Image = require("@11ty/eleventy-img");
const path = require("path");

async function imageShortcode(
	src,
	alt,
	sizes = "400px",
	widths = [400, 800],
	lazy = false,
) {
	let metadata = await Image(src, {
		widths: widths,
		formats: ["webp", "avif", "jpeg"],
		urlPath: "/images/posts",
		outputDir: "./_site/images/posts",
		filenameFormat: function (id, src, width, format, options) {
			const extension = path.extname(src);
			const name = path.basename(src, extension);
			return `${name}_${width}w.${format}`;
		},
	});
	const lowsrc = metadata.jpeg[0];
	const highsrc = metadata.jpeg[metadata.jpeg.length - 1];

	return `<picture>
    ${Object.values(metadata)
			.map((imageFormat) => {
				return `<source type="${
					imageFormat[0].sourceType
				}" srcset="${imageFormat
					.map((entry) => entry.srcset)
					.join(", ")}" sizes="${sizes}">`;
			})
			.join("\n")}
      <img
        src="${lowsrc.url}"
        width="${highsrc.width}"
        height="${highsrc.height}"
        alt="${alt}"
        loading="${lazy.toString()}"
        decoding="async">
    </picture>`;
}

module.exports = function (eleventyConfig) {
	// Plugins
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	eleventyConfig.addPlugin(eleventyPluginFilesMinifier);
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPlugin(EleventyRenderPlugin);
	eleventyConfig.addPlugin(pluginWebc, {
		components: "./src/components/webc/*.webc",

		// Adds an Eleventy WebC transform to process all HTML output
		// useTransform: false,

		// Additional global data used in the Eleventy WebC transform
		// transformData: {},
	});

	// Frontmatter
	eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: "<!-- excerpt -->",
		excerpt_alias: "excerpt",
	});

	// Shortcodes
	eleventyConfig.addShortcode("minifyJson", (json) => {
		return JSON.stringify(JSON.parse(json));
	});
	eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

	// Filters
	// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
	});

	eleventyConfig.addFilter("readableDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
			"MMMM d, yyyy",
		);
	});

	// Passthrough configuration
	// https://www.11ty.dev/docs/copy/#passthrough-during-serve
	eleventyConfig.setServerPassthroughCopyBehavior("copy");

	// Passthroughs
	eleventyConfig.addPassthroughCopy("src/site.webmanifest");
	eleventyConfig.addPassthroughCopy("src/browserconfig.xml");
	eleventyConfig.addPassthroughCopy("src/mstile-150x150.png");
	eleventyConfig.addPassthroughCopy("src/favicon-*.png");
	eleventyConfig.addPassthroughCopy("src/android-chrome-*.png");
	eleventyConfig.addPassthroughCopy({ "dist/css/main.css": "css/main.css" });
	eleventyConfig.addPassthroughCopy("src/images/og/*");
	eleventyConfig.addPassthroughCopy("src/images/profile/*");
	eleventyConfig.addPassthroughCopy("src/apis/urls.json");
	eleventyConfig.addPassthroughCopy("src/apis/urls.json");

	/*
	eleventyConfig.addPassthroughCopy({
		"node_modules/speedlify-score.js": "js/speedlify-score.js",
	});
	eleventyConfig.addPassthroughCopy({
		"node_modules/speedlify-score.css": "style/speedlify-score.css",
	});
	*/

	eleventyConfig.setServerOptions({
		liveReload: true,
		domDiff: true,
		port: 3000,
		watch: ["dist/css/main.css"],
		showAllHosts: false,
		encoding: "utf-8",
	});

	return {
		// Control which files Eleventy will process
		templateFormats: ["njk", "txt", "xml", "webc"],

		// Pre-process *.md and *.html files with Nunjucks.
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		pathPrefix: "/",
		dir: {
			input: "src",
			includes: "includes",
			layouts: "layouts",
			data: "data",
			output: "_site",
		},
	};
};
