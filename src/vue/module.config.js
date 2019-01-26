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
    'vue.created': {
    },
    'vue.mounted': {
    },
    'vue.route': {
    },
    'vuex.module': {
    }
  },
  activator: activator
}
