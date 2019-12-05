export default context => {
  const files = require.context('./modules', false, /\.js$/)
  const modules = {}
  files.keys().forEach(key => {
    modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default(context)
  })
  return {
    namespaced: true,
    modules
  }
}
