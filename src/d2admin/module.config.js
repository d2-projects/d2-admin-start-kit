/**
 * 模块描述文件
 */
import d2AdminVuePlugin from '@/plugin/d2admin'
import d2AdminVuexModule from '@/store/modules/d2admin'
import d2AdminVueRouter from '@/router'
import d2AdminVueOptions from './vue.options'

export default {
  name: 'd2admin',
  dependencies: [
    'vue'
  ],
  extensions: {
    'vue.plugin': {
      d2admin: d2AdminVuePlugin
    },
    'vue.options': {
      d2admin: d2AdminVueOptions
    },
    'vue.route': {
      '/': d2AdminVueRouter
    },
    'vuex.module': {
      d2admin: d2AdminVuexModule
    }
  }
}
