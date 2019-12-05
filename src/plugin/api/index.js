import api from '@/api'

export default {
  install (Vue, options) {
    Vue.prototype.$api = api
  }
}
