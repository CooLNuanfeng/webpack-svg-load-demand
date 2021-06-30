const webpack = require('webpack')
let SvgSpriteLoadByDemand = null
if (webpack.version && webpack.version[0] > 4) {
  // webpack5 and upper
  SvgSpriteLoadByDemand = require('./plugin-webpack5')
} else {
  // webpack4 and lower
  SvgSpriteLoadByDemand = require('./plugin-webpack4')
}
module.exports = SvgSpriteLoadByDemand