/**
 * 模块描述文件
 */
import vuePlugin from './vue.plugin'
import vueRouterEvent from './vue.router.event'
import session from '@/store/modules/session'

session.storage = 'session'

export default {
  name: 'frame',
  dependencies: [
    'vue',
    'd2admin'
  ],
  extensions: {
    'vue.plugin': {
      frame: vuePlugin
    },
    'vue.router.event': {
      frame: vueRouterEvent
    },
    'vuex.module': {
      session
    }
  },
  extensionPoints: {
    menu: {
    }
  }
}
