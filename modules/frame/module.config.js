/**
 * 模块描述文件
 */
export default {
  name: 'frame',
  dependencies: [
    'vue'
  ],
  extensions: {
    'vue.plugin': {
    },
    'vue.route': {
    },
    'vuex.module': {
      name: 'frame', // 默认值 module.name
      path: 'store' // 默认值 'store'
    }
  },
  extensionPoints: {
    'frame.menu': {
    }
  }
}
