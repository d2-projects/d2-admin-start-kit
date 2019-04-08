// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')

// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

// 增加环境变量
process.env.VUE_APP_NAME = process.env.npm_package_name
process.env.VUE_APP_VERSION = process.env.npm_package_version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')

module.exports = {
  // publicPath 使用相对路径可以满足大多数情况需求
  // 如遇特殊情况满足不了请调整该值，请参考Vue Cli文档中关于“相对 publicPath 的限制”：https://cli.vuejs.org/zh/config/#publicpath
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  outputDir: 'target/dist',
  assetsDir: 'static',
  lintOnSave: true,
  productionSourceMap: false, // 是否为生产环境构建生成 sourceMap
  // devServer: {
  //   publicPath: '/'
  // },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        data: `@import '~@/assets/style/public.scss';`
      }
    }
  },
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: config => {
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve
      .symlinks(true)

    config
      // 开发环境
      .when(process.env.NODE_ENV === 'development',
        // sourcemap不包含列信息
        config => config.devtool('cheap-source-map')
      )
      // 非开发环境
      .when(process.env.NODE_ENV !== 'development', config => {
        config
          .plugin('html')
          .tap(args => {
            // 压缩 html 中的 CSS
            args[0].minify.minifyCSS = true
            return args
          })

        config.optimization
          .minimizer([
            new TerserPlugin({
              cache: true,
              parallel: true,
              terserOptions: {
                // 移除 console
                // 参考 https://github.com/webpack-contrib/terser-webpack-plugin
                compress: {
                  drop_console: true,
                  drop_debugger: true,
                  pure_funcs: ['console.log']
                }
              }
            })
          ])
      })

    // markdown
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('text-loader')
      .loader('text-loader')
      .end()

    // i18n
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end()

    // svg
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'd2-[name]'
      })
      .end()

    // image exclude
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude
      .add(resolve('src/assets/svg-icons/icons'))
      .end()

    // 重新设置 alias
    // config.resolve.alias
    //   .set('modular-vue', resolve('src/vue'))

    // 判断环境加入模拟数据
    if (process.env.VUE_APP_BUILD_MODE !== 'nomock') {
      config
        .entry('app')
        .add('@/mock')
        .end()
    }
  },
  configureWebpack: {
    plugins: [
      // new BundleAnalyzerPlugin()
    ],
    externals: {
      logger: 'console',
      serverConfig: 'serverConfig'
    }
  }
}
