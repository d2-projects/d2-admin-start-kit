import Auth from '@/libs/Auth'

export default {
  install (vue) {
    vue.mixin(Auth)
  }
}
