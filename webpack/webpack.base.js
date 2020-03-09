// Native Node modules.
const path = require('path')

// Webpack plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const basePath = path.resolve(__dirname, '..')
const srcPath = path.resolve(__dirname, '..', 'src')

const paths = {
  base: basePath,
  src: srcPath,
  // js: path.resolve(basePath, 'src', 'js'),
  scss: path.resolve(srcPath, 'scss'),
  images: path.resolve(srcPath, 'images'),
  fonts: path.resolve(srcPath, 'fonts'),
  dist: path.resolve(basePath, 'dist')
}

module.exports = {
  plugins: [new MiniCssExtractPlugin({
    filename: 'css/[name].css'
  })],
  entry: {
    // path.resolve(paths.scss, 'main.js'),
    main: [
      path.resolve(paths.scss, 'main.scss')
    ],
    critical: [
      path.resolve(paths.images, 'global', 'eric-carlisle-275x275.png'),
      path.resolve(paths.scss, 'critical.scss')
    ]
  },
  output: {
    filename: '[name].js'
    // publicPath: 'https://www.ericcarlisle.com/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('autoprefixer')(),
                require('css-mqpacker')({ sort: true })
              ]
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {}
          },
          'fast-sass-loader'
        ]
      },
      {
        test: /\.(woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img',
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  }
}
