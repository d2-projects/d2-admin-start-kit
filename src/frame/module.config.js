/**
 * 模块描述文件
 */

import { ExtensionPointType } from 'modular-core'

import vueOptions from './vue.options'
import vuePlugin from './vue.plugin'
import d2AdminVuePlugin from './plugin/d2admin'
import routes from './routes'
import vueRouterEvent from './vue.router.event'
import session from './store/session'
import d2AdminVuexModule from './store/d2admin'

session.storage = 'session'

export default {
  name: 'frame',
  dependencies: ['vue'],
  extensions: {
    'vue.plugins': [vuePlugin, d2AdminVuePlugin],
    'vue.options': vueOptions,
    'vue.router.routes': {
      parent: 'root',
      routes
    },
    'vue.router.hooks': vueRouterEvent,
    'vuex.modules': {
      session,
      d2admin: d2AdminVuexModule
    }
  },
  extensionPoints: {
    menu: {
      type: ExtensionPointType.Multiple
    }
  }
}
