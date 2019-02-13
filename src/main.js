import Modular from '@/modular'

// 遍历目录，获取模块配置
const files = require.context('./', true, /module\.config\.js$/)
const modules = []

files.keys().forEach(key => {
  modules.push(files(key).default)
})

// 应用配置
const application = {}

// 模块化组装
const modular = new Modular({
  modules,
  application
})
window.$modular = modular

// 应用启动
modular.start()
