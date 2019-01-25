import Vue from 'vue'

export default class Activator {
  extensions (extensions) {
    const plugins = extensions['vue.plugin'] || {}
    for (let key in plugins) {
      Vue.use(plugins[key])
    }
  }
}
