// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
  baseUrl: '', // 使用相对路径可以满足大多数情况需求，如遇特殊情况满足不了请调整该值，请参考Vue Cli文档中关于“相对 baseUrl 的限制”：https://cli.vuejs.org/zh/config/#baseurl
  outputDir: 'target/dist',
  assetsDir: 'static',
  lintOnSave: true,

  // 是否为生产环境构建生成sourceMap
  productionSourceMap: false,

  devServer: {
    publicPath: '/'
  },
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
    config.resolve.alias
      .set('@', resolve('src'))

    // babel-polyfill 加入 entry
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
    // 判断环境加入模拟数据
    if (process.env.VUE_APP_BUILD_MODE !== 'nomock') {
      entry
        .add('@/mock')
        .end()
    }

    if (process.env.NODE_ENV === 'production') {
      // 压缩CSS
      config
        .plugin('html')
        .tap(args => {
          args[0].minify.minifyCSS = true
          return args
        })
    }
  }

}
