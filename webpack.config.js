const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {

  entry: './src/app.ts',
  
  // Write the output to the .aws-sam/build folder
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve('./build')
  },

  // Create source maps
  devtool: 'source-map',

  // .js extensions
  resolve: {
    extensions: ['.ts', '.js'],

    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },

  // Target node
  target: 'node',
  
  externals: process.env.NODE_ENV === 'development' ? [] : ['aws-sdk'],

  // Set the webpack mode
  mode: process.env.NODE_ENV || 'production',

  module: {
    rules: [
      {
        test: /\.(ts)$/,
        loader: 'ts-loader',
        include: [
          path.resolve(__dirname, 'src'),
        ],
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ]
  },

  plugins: [
    // Moving TypeScript compilation into separate process for quicker build time
    new ForkTsCheckerWebpackPlugin()
  ],

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
}
