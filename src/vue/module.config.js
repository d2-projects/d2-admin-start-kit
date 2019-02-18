/**
 * 模块描述文件
 */
import activator from './activator'

export default {
  name: 'vue',
  extensions: {
    'jest': { path: 'tests' }
  },
  extensionPoints: {
    'vue.plugin': {
    },
    'vue.options': {
    },
    'vue.route': {
    },
    'vuex.module': {
    }
  },
  activator: activator
}
