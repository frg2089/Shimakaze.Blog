import config from './webpack.config.common'

export default config({
  out: "dist",
  mode: 'production',
  filename: "js/[name].[contenthash].js",
})