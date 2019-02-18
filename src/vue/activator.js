import Vue from 'vue'
// import VueRouter from 'vue-router'

// FIXME 临时跑通逻辑
import App from '@/App'
import store from '@/store'
import i18n from '@/i18n'
import router from '@/router'
import Auth from '@/libs/Auth'

export default {
  start (moduleConfig) {
    // 处理 vue.plugin
    let configs = moduleConfig.extensions['vue.plugin'] || {}
    for (let key in configs) {
      Vue.use(configs[key])
    }
    // 处理 vue.options
    const options = []
    configs = moduleConfig.extensions['vue.options'] || {}
    for (let key in configs) {
      options.push(configs[key])
    }

    // 处理 vue.route
    // const routeConfig = moduleConfig.extensions['vue.route'] || {}
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

    const vueOptions = {
      router,
      store,
      i18n,
      mixins: options,
      render: h => h(App)
    }

    new Vue(vueOptions).$mount('#app')
  }
}
