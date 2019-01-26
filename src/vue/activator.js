import Vue from 'vue'
// import VueRouter from 'vue-router'

// FIXME 临时跑通逻辑
import App from '@/App'
import store from '@/store'
import i18n from '@/i18n'
import router from '@/router'
import menu from '@/menu'
import { frameInRoutes } from '@/router/routes'
import Auth from '@/libs/Auth'
import util from '@/libs/util'
import setting from '@/setting'

export default {
  start (modular) {
    const vueConfig = {}
    // 处理 vue.plugin
    const plugins = modular.extensions['vue.plugin'] || {}
    for (let key in plugins) {
      Vue.use(plugins[key])
    }
    // 处理 vue.route
    // const routeConfig = modular.extensions['vue.route'] || {}
    // let routes
    // let t = false
    // for (let key in routeConfig) {
    //   t = true
    //   // 根据 key 组装 route
    //   // FIXME 临时跑通逻辑
    //   if (key === '/') {
    //     routes = routeConfig[key]
    //   }
    // }
    // if (t) {
    //   Vue.use(VueRouter)
    //   vueConfig.router = new VueRouter({
    //     routes
    //   })
    // }

    // FIXME 临时跑通逻辑
    Vue.mixin(Auth)

    Object.assign(vueConfig, {
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
    })

    new Vue(vueConfig).$mount('#app')
  }
}
