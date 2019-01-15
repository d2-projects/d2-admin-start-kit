/**
 * 模块描述文件
 */
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
  }
}
