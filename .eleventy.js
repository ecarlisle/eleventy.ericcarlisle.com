const { DateTime } = require("luxon");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const eleventyPluginFilesMinifier = require("@sherby/eleventy-plugin-files-minifier");
const Image = require("@11ty/eleventy-img");
const path = require("path");
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");

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
		outputDir: "./public/images/posts",
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
	eleventyConfig.addPlugin(UpgradeHelper);

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

	// Passthroughs
	eleventyConfig.addPassthroughCopy("public");
	/*eleventyConfig.addPassthroughCopy({
		"node_modules/yet-another-react-lightbox/dist/styles.css":
			"public/style/lightbox.scss",
	});*/
	// Layout aliases
	eleventyConfig.addLayoutAlias("base", "base.njk");
	eleventyConfig.addLayoutAlias("section", "section.njk");
	eleventyConfig.addLayoutAlias("post", "post.njk");

	return {
		// Control which files Eleventy will process
		templateFormats: ["njk", "txt", "xml"],

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
