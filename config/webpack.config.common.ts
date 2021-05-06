import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'
import WorkboxPlugin from 'workbox-webpack-plugin'

interface WebpackOptions {
  out: string
  filename: string
  mode?: "development" | "production" | "none"
  watch?: boolean
  devtool?: string | false
}

function config(options: WebpackOptions): webpack.Configuration {
  const dir_base = path.join(__dirname, '..')
  const dir_src = path.join(dir_base, 'src')
  const dir_assets = path.join(dir_base, 'assets')
  const dir_out = path.join(dir_base, options.out)
  return {
    mode: options.mode,
    watch: options.watch,
    devtool: options.devtool,

    entry: path.join(dir_src, 'app'),

    output: {
      path: dir_out,
      filename: options.filename,
    },

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          react: {
            test: /[\\/]react.*[\\/]/,
            name: 'react',
            priority: -5
          },
          materialLab: {
            test: /[\\/]\@material-ui[\\/]lab[\\/]/,
            name: 'material-ui/lab',
            priority: -5
          },
          materialCore: {
            test: /[\\/]\@material-ui[\\/]core[\\/]/,
            name: 'material-ui/core',
            priority: -5
          },
          materialIcons: {
            test: /[\\/]\@material-ui[\\/]icons[\\/]/,
            name: 'material-ui/icons',
            priority: -5
          },
          vendor: {
            test: /[\/]node_modules[\/]/,
            name: 'vendor',
            priority: -10
          },
        }
      }
    },

    module: {
      rules: [
        {
          test: /.jsx?$/,
          include: [
            dir_src
          ],
          exclude: [
            path.resolve(dir_base, 'node_modules')
          ],
          loader: 'babel-loader',
        }, {
          test: /.tsx?$/,
          include: [
            dir_src
          ],
          exclude: [
            path.resolve(dir_base, 'node_modules')
          ],
          use: [
            'babel-loader',
            'awesome-typescript-loader'
          ]
        },
        {
          test: /\.(jpg|png)$/,
          loader: "file-loader",
          options: {
            name: '[name].[ext]',
            outputPath: 'img'
          }
        },
      ]
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.json', '.js', '.jsx', ".jpg"]
    },

    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(dir_assets, 'image'),
            to: 'img'
          },
          {
            from: path.join(dir_assets, 'style'),
            to: 'css'
          },
          {
            from: path.join(dir_assets, 'md'),
            to: 'post'
          },
          {
            from: path.join(dir_assets, 'manifest.json'),
            to: 'manifest.json'
          },
        ]
      }),
      new WorkboxPlugin.GenerateSW({
        cacheId: 'webpack-pwa', // 设置前缀
        skipWaiting: true, // 强制等待中的 Service Worker 被激活
        clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
        swDest: 'service-worker.js', // 输出 Service worker 文件
        inlineWorkboxRuntime: false,
        modifyURLPrefix: {
          '': '/'
        },
        runtimeCaching: [
          // 配置路由请求缓存 对应 workbox.routing.registerRoute
          {
            urlPattern: /.*\/icons\.js/,
            handler: 'StaleWhileRevalidate'
          }, {
            urlPattern: /.*\.js/, // 匹配文件
            handler: 'NetworkFirst' // 网络优先
          }, {
            urlPattern: /.*\.html/,
            handler: 'NetworkFirst'
          }, {
            urlPattern: /.*\.css/,
            handler: 'NetworkFirst'
          }, {
            urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
            handler: 'CacheFirst', // 缓存优先
            options: {
              plugins: [
                {
                  expiration: {
                    maxAgeSeconds: 24 * 60 * 60, // 最长缓存时间,
                    maxEntries: 50 // 最大缓存图片数量
                  }
                }
              ]
            }
          }
        ]
      }),
      new HtmlWebpackPlugin({
        template: path.join(dir_assets, 'view', 'index.html'),
        filename: path.join(dir_out, '404.html'),
        favicon: path.join(dir_assets, 'image', 'favicon.jpg'),
        publicPath: "/",
        inject: 'body'
      }),
    ],
  }
}

export default config