import util from '@/libs/util'

export default {
  install (Vue:any, options:any) {
    Vue.prototype.$open = util.open
  }
}
