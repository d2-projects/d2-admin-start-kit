import setting from '@/setting.js'

export default {
  namespaced: true,
  state: {
    uuid: '',
    token: '',
    user: {
      name: setting.user.info.name,
      permissions: []
    }
  },
  getters: {
    loggedIn (state) {
      return state.token !== ''
    }
  },
  mutations: {
    /**
     * @description 设置 uuid
     * @param {Object} state vuex state
     * @param {String} uuid uuid
     */
    setUuid (state, uuid) {
      state.uuid = uuid
    },
    /**
     * @description 设置 token
     * @param {Object} state vuex state
     * @param {String} token token
     */
    setToken (state, token) {
      state.token = token
    },
    /**
     * @description 设置用户数据
     * @param {Object} state vuex state
     * @param {*} user user
     */
    setUser (state, user) {
      // store 赋值
      state.user.name = user.name
      state.user.permissions = user.permissions
    },
    /**
     * @description 重置用户数据
     * @param {Object} state vuex state
     */
    reset (state) {
      // store 赋值
      state.user.name = setting.user.info.name
      state.user.permissions = []
      state.uuid = ''
      state.token = ''
    }
  }
}
