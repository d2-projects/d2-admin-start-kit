import util from '@/utils'

export default {
  install (Vue, options) {
    Vue.prototype.$open = util.open
  }
}
