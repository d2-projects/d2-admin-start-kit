// 导入 modules 下的 Vuex 模块
const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default {
  namespaced: true,
  modules
}
