const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')

// 生产环境为 ./ ，开发环境为 /
// let publicPath = '/'
let publicPath = process.env.NODE_ENV !== 'production' ? '/' : './'

// 动态引入文件控制
/*  ali-oss是阿里云文件服务，此处不需要，留存给有需要的用户
    lodash是需要按需配置，此处不做详细配置
    crypto-js是加密解密的第三库，登录页面可用
*/
const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios',
  'element-ui': 'ELEMENT',
  'js-cookie': 'Cookies',
  'nprogress': 'NProgress',
  // 'ali-oss': 'ali-oss',
  // 'lodash': 'lodash',
  'vue-i18n': 'VueI18n',
  'better-scroll': 'BScroll',
  // 'crypto-js': 'CryptoJS',
  'dayjs': 'dayjs',
  'fuse.js': 'Fuse',
  'ua-parser-js': 'UAParser',
  'hotkeys-js': 'hotkeys'
}

// 引入文件的cdn链接
const cdn = {
  // 开发环境
  dev: {
    css: [
      'https://unpkg.com/element-ui@2.4.4/lib/theme-chalk/index.css',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.css',
      'https://unpkg.com/flex.css@1.1.7/dist/flex.css'
    ],
    js: [

    ]
  },
  // 生产环境
  build: {
    css: [
      'https://unpkg.com/element-ui@2.4.4/lib/theme-chalk/index.css',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css',
      'https://unpkg.com/flex.css@1.1.7/dist/flex.css'
    ],
    js: [
      'https://unpkg.com/vue@2.5.17/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
      'https://unpkg.com/element-ui/lib/index.js',
      'https://cdn.bootcss.com/js-cookie/2.2.0/js.cookie.min.js',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js',
      'https://unpkg.com/ali-oss@6.1.0/dist/aliyun-oss-sdk.js',
      'https://unpkg.com/ali-oss@6.1.0/dist/aliyun-oss-sdk.min.js',
      'https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js',
      'https://unpkg.com/vue-i18n@7.4.2/dist/vue-i18n.min.js',
      'https://unpkg.com/better-scroll@1.12.1/dist/bscroll.min.js',
      'https://cdn.bootcss.com/crypto-js/3.1.9-1/crypto-js.min.js',
      'https://unpkg.com/dayjs@1.6.7/dayjs.min.js',
      'https://unpkg.com/fuse.js@3.2.1/dist/fuse.js',
      'https://cdn.jsdelivr.net/npm/ua-parser-js@0.7.18/dist/ua-parser.min.js',
      'https://unpkg.com/hotkeys-js@3.3.6/dist/hotkeys.min.js'
    ]
  }
}

module.exports = {
  publicPath,
  // lintOnSave 是控制你Eslint在生产环境进行Eslint控制
  // 下方有在生产环境移除console，但页面的console打包时仍报错
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    publicPath // 和 publicPath 保持一致
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
    /**
     * 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
     */
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev
      }
      return args
    })
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins
      .delete('prefetch')
      .delete('preload')
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
        config.optimization
          .minimizer([
            new UglifyJsPlugin({
              uglifyOptions: {
                // 移除 console
                // 其它优化选项 https://segmentfault.com/a/1190000010874406
                compress: {
                  warnings: false,
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
    config.resolve.alias
      .set('@api', resolve('src/api'))
    // node
    config.node
      .set('__dirname', true)
      .set('__filename', true)
    // 判断环境加入模拟数据
    const entry = config.entry('app')
    if (process.env.VUE_APP_BUILD_MODE !== 'nomock') {
      entry
        .add('@/mock')
        .end()
    }

    // 打包工具,注释掉就不会再显示
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },

  // 修改webpack config, 使其不打包externals下的资源
  configureWebpack: config => {
    const myConfig = {}
    if (process.env.NODE_ENV === 'production') {
      // 1. 生产环境npm包转CDN
      myConfig.externals = externals
    }
    if (process.env.NODE_ENV === 'development') {
      /**
       * 关闭host check，方便使用ngrok之类的内网转发工具
       */
      myConfig.devServer = {
        disableHostCheck: true
      }
    }
    return myConfig
  }
}
