/**
 * 模块描述文件
 */
import plugin from './vue.plugin'

export default {
  name: 'frame',
  dependencies: [
    'vue',
    'd2admin'
  ],
  extensions: {
    'vue.plugin': {
      frame: plugin
    }
  },
  extensionPoints: {
    menu: {
    }
  }
}
