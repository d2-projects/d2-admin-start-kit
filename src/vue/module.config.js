/**
 * modular-vue 模块
 */
import Vue from 'vue'

import vuexAlong from './vuex-along'
import router from './router'
import store from './store'

// FIXME 临时跑通
import i18n from '@/i18n'

const activator = {}

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
  const application = moduleConfig.getApplication()
  vuexAlong.setKey(`${application.name}-${application.version}`)

  // 处理 vuex.module
  let configs = moduleConfig.getExtension('vuex.module')
  for (let key in configs) {
    store.registerModule(key, configs[key])
  }

  // 处理 vue.plugin
  configs = moduleConfig.getExtension('vue.plugin')
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
  configs = moduleConfig.getExtension('vue.router')
  for (let key in configs) {
    // 根据 key 组装 router
    // FIXME 临时跑通逻辑
    if (key === '/') {
      router.addRoutes(configs[key])
    }
  }

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
