const format = require('date-fns/format')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

module.exports = eleventyConfig => {
  
  eleventyConfig.addNunjucksFilter('dateFormat', value => {
    const date = Date.parse(value)
    return format(date, 'MMMM d, yyyy')
  })

  eleventyConfig.addPlugin(syntaxHighlight)

  return {
    dir: {
      markdownTemplateEngine: 'njk',
      input: 'site',
      includes: 'includes',
      layouts: 'layouts',
      data: 'data',
      output: 'dist',
    }
  }
}