// polyfill
import 'babel-polyfill'
// Vue
import Vue from 'vue'
import App from './App'
// store
import store from '@/store/index'
// 多国语
import i18n from './i18n'
// 核心插件
import d2Admin from '@/plugin/d2admin'

// [ 可选插件组件 ]D2-Crud
// import D2Crud from '@d2-projects/d2-crud'

// 菜单和路由设置
import router from './router'
import menu from '@/menu'
import { frameInRoutes } from '@/router/routes'

// 授权 mixin
import Auth from '@/libs/Auth'
import util from '@/libs/util'
import setting from './setting'

// 核心插件
Vue.use(d2Admin)

// 可选插件组件
// https://github.com/d2-projects/d2-crud
// Vue.use(D2Crud)

// 授权 mixin
Vue.mixin(Auth)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置菜单
    this.$store.dispatch('d2admin/menu/set', menu)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menu)
  },
  mounted () {
    // 展示系统信息
    // this.$store.commit('d2admin/releases/versionShow')
    util.log.capsule(
      setting.releases.name,
      `v${setting.releases.version} (${setting.releases.buildTime.substr(0, 6)})`
    )
    if (process.env.NODE_ENV === 'development') {
      console.log(process.env)
    }
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')
