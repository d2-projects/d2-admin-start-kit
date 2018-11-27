// 设置文件
import setting from '@/setting.js'

export default {
  namespaced: true,
  state: {
    // 用户信息
    name: setting.user.info.name,
    permissions: []
  },
  actions: {
    /**
     * @description 设置用户数据
     * @param {Object} state vuex state
     * @param {*} user user
     */
    set ({ state }, user) {
      return new Promise(async resolve => {
        // store 赋值
        state.name = user.name
        state.permissions = user.permissions
        // end
        resolve()
      })
    },
    /**
     * @description 重置用户数据
     * @param {Object} state vuex state
     */
    reset ({ state }) {
      return new Promise(async resolve => {
        // store 赋值
        state.name = setting.user.info.name
        state.permissions = []
        // end
        resolve()
      })
    }
  }
}
