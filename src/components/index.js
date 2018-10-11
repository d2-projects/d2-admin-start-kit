import Vue from 'vue'

import d2Container from './d2-container'
import d2ContainerFrame from './d2-container-frame'

// 注意 有些组件使用异步加载会有影响
Vue.component('d2-container', d2Container)
Vue.component('d2-container-frame', d2ContainerFrame)
Vue.component('d2-page-cover', () => import('./d2-page-cover'))
Vue.component('d2-icon', () => import('./d2-icon'))
Vue.component('d2-icon-svg', () => import('./d2-icon-svg/index.vue'))
