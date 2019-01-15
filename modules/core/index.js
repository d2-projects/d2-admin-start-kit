const files = require.context('../', true, /module\.config\.js$/)
const modules = {}

files.keys().forEach(key => {
  console.log(key)
  modules[key.replace(/(\.\/|\/module\.config\.js)/g, '')] = files(key).default
})

export default modules
