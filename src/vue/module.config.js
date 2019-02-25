/**
 * modular-vue 模块
 */
import Vue from 'vue'
// FIXME 临时跑通
import store from '@/store'
import i18n from '@/i18n'
import router from '@/router'

const activator = {}

// export const router = {}
// export const store = {}
// export const i18n = {}

export default {
  name: 'vue',
  extensionPoints: {
    'vue.app': {
    },
    'vue.plugin': {
    },
    'vue.options': {
    },
    'vue.router': {
    },
    'vuex.module': {
    }
  },
  activator
}

activator.start = function (moduleConfig) {
  // 处理 vue.plugin
  let configs = moduleConfig.getExtension('vue.plugin')
  for (let key in configs) {
    Vue.use(configs[key])
  }
  // 处理 vue.options
  const options = []
  configs = moduleConfig.getExtension('vue.options')
  for (let key in configs) {
    options.push(configs[key])
  }

  // 处理 vue.router
  // const routerConfig = moduleConfig.getExtension('vue.router')
  // let routers
  // let t = false
  // for (let key in routerConfig) {
  //   t = true
  //   // 根据 key 组装 route
  //   // FIXME 临时跑通逻辑
  //   if (key === '/') {
  //     routers = routerConfig[key]
  //   }
  // }
  // if (t) {
  //   Vue.use(VueRouter)
  //   vueConfig.router = new VueRouter({
  //     routers
  //   })
  // }

  // 处理 vue.app
  const app = moduleConfig.getExtension('vue.app')
  const vueOptions = {
    router,
    store,
    i18n,
    mixins: options,
    render: h => h(app.component)
  }
  new Vue(vueOptions).$mount(app.el)
}
