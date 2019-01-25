/**
 * 模块描述文件
 */
import d2AdminVuePlugin from '@/plugin/d2admin'
import d2AdminVuexModule from '@/store/index/modules/d2admin'
import d2AdminVueRouter from '@/router'

export default {
  name: 'd2admin',
  dependencies: [
    'vue'
  ],
  extensions: {
    'vue.plugin': {
      'd2Admin': d2AdminVuePlugin
    },
    'vue.created': {
      d2Admin () {
      }
    },
    'vue.mounted': {
      d2Admin () {
      }
    },
    'vue.route': {
      '/': d2AdminVueRouter
    },
    'vuex.module': {
      'd2admin': d2AdminVuexModule
    }
  },
  extensionPoints: {
    'menu': {
    }
  }
}
