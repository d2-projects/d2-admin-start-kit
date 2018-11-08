import util from '@/libs/util.js'
import setting from '@/setting.js'

export default {
  namespaced: true,
  state: {
    name: setting.releases.name,
    version: setting.releases.version
  },
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state vuex state
     */
    versionShow (state) {
      util.log.capsule(state.name, `v${state.version}`)
      console.log('Github https://github.com/han-feng/cvicse-admin-start-kit')
      if (process.env.NODE_ENV === 'development') {
        console.log(process.env)
      }
    }
  }
}
