/**
 * 模块描述文件
 */
import Activator from './Activator'

export default {
  name: 'vue',
  extensions: {
    'jest': { path: 'tests' }
  },
  extensionPoints: {
    'vue.plugin': {
    },
    'vue.route': {
    },
    'vuex.module': {
    }
  },
  Activator: Activator
}
