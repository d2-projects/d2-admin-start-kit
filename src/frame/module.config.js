/**
 * 模块描述文件
 */
export default {
  name: 'frame',
  dependencies: [
    'vue',
    'd2admin'
  ],
  extensions: {
    'vue.plugin': {
      frame: {}
    }
  },
  extensionPoints: {
    menu: {
    }
  }
}
