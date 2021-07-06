const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackSvgLoadDemand = require('./index') 

module.exports = {
  entry: path.resolve(__dirname, './test/main.js'),
  output: {
    path: path.resolve(__dirname, './test/dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      // { loader: require.resolve('./debugger') },
      {
        test: /\.vue$/,
        use: [
          'vue-loader',
        ]
      },
      // example configuring CSS Modules
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new WebpackSvgLoadDemand({entryRoot: './test'}),
  ]
}
