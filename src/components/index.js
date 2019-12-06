import Vue from 'vue'

import d2Container from './d2-container'

// 注意 有些组件使用异步加载会有影响
Vue.component('d2-container', d2Container)
Vue.component('d2-icon', () => import('./d2-icon'))
Vue.component('d2-icon-svg', () => import('./d2-icon-svg/index.vue'))

const vueFiles = require.context('./tao-admin', true, /component\.vue$/)
vueFiles.keys().forEach(key => {
  const component = vueFiles(key).default
  Vue.component(component.name, component)
})

const jsFiles = require.context('./tao-admin', true, /component\.js$/)
jsFiles.keys().forEach(key => {
  const component = jsFiles(key).default
  Vue.component(component.name, component)
})
