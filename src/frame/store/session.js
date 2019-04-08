export default {
  namespaced: true,
  state: {
    uuid: '',
    token: '',
    showIframe: false,
    currentIframe: '',
    iframes: [],
    user: {
      name: null,
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
     * @description 设置是否显示 Iframe
     * @param {Object} state vuex state
     * @param {*} showIframe showIframe
     */
    setShowIframe (state, showIframe) {
      state.showIframe = showIframe
    },
    enterIframe (state, { key, src }) {
      if (!state.iframes.find(item => item.key === key)) {
        state.iframes.push({ key, src })
      }
      state.currentIframe = key
      state.showIframe = true
    },
    leaveIframe (state) {
      state.showIframe = false
    },
    closeIframe (state, key) {
      state.showIframe = false
      const i = state.iframes.findIndex(item => item.key === key)
      if (i >= 0) {
        state.iframes.splice(i, 1)
      }
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
      state.user.name = null
      state.user.permissions = []
      state.uuid = ''
      state.token = ''
      state.showIframe = false
    }
  }
}
