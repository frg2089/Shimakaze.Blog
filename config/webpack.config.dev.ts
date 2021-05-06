import config from './webpack.config.common'

export default config({
  out: "dist",
  mode: 'development',
  watch: true,
  devtool: 'source-map',
  filename: "js/[name].js",
})