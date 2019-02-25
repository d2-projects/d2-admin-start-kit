/**
 * 模块描述文件
 */
import plugin from './vue.plugin'
import session from '@/store/modules/session'

export default {
  name: 'frame',
  dependencies: [
    'vue',
    'd2admin'
  ],
  extensions: {
    'vue.plugin': {
      frame: plugin
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
