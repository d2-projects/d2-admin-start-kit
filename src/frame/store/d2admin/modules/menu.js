// 设置文件
import setting from '@/setting.js'
import { uniqueId, isArray, cloneDeep } from 'lodash'
import { checkPermission } from '@/libs/Auth'

export default {
  namespaced: true,
  state: {
    // 顶栏菜单
    header: [],
    // 侧栏菜单
    aside: [],
    // 侧边栏收缩
    asideCollapse: setting.menu.asideCollapse,
    // 显示无权访问菜单
    showNoAuth: setting.menu.showNoAuth
  },
  actions: {
    /**
     * 设置菜单
     * @param {Object} state vuex state
     * @param {Object} menu menu setting
     */
    set ({ state, commit }, menu) {
      return new Promise(async resolve => {
        if (!menu) {
          menu = state.header
        }
        commit('headerSet', menu)
        // end
        resolve()
      })
    },
    /**
     * 切换侧边栏展开和收缩
     * @param {Object} state vuex state
     */
    asideCollapseToggle ({ state, dispatch, commit }) {
      return new Promise(async resolve => {
        // store 赋值
        commit('asideCollapseSet', !state.asideCollapse)
        // 持久化
        await dispatch('d2admin/db/set', {
          dbName: 'sys',
          path: 'menu.asideCollapse',
          value: state.asideCollapse,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * 从持久化数据读取侧边栏展开或者收缩
     * @param {Object} state vuex state
     */
    asideCollapseLoad ({ dispatch, commit }) {
      return new Promise(async resolve => {
        // store 赋值
        let asideCollapse = await dispatch('d2admin/db/get', {
          dbName: 'sys',
          path: 'menu.asideCollapse',
          defaultValue: setting.menu.asideCollapse,
          user: true
        }, { root: true })
        commit('asideCollapseSet', asideCollapse)
        // end
        resolve()
      })
    }
  },
  mutations: {
    /**
     * @description 设置顶栏菜单
     * @param {Object} state vuex state
     * @param {Array} menu menu setting
     */
    headerSet (state, menu) {
      // store 赋值
      menu.forEach(item => {
        if (isArray(item.children)) {
          item.path = uniqueId('header-menu-')
          item.children.parent = item.path
        } else {
          // 没有子菜单的情况，自动复制自身成为唯一子菜单
          item.children = [ cloneDeep(item) ]
          item.path = uniqueId('header-menu-')
          item.children.parent = item.path
        }
        // 根据权限设置标志
        authCheck(item)
      })
      state.header = menu
    },
    /**
     * @description 设置侧边栏菜单
     * @param {Object} state vuex state
     * @param {Array} menu menu setting
     */
    asideSet (state, menu) {
      // store 赋值
      state.aside = menu
    },
    /**
     * 设置侧边栏展开或者收缩
     * @param {Object} state vuex state
     * @param {Boolean} collapse is collapse
     */
    asideCollapseSet (state, collapse) {
      // store 赋值
      state.asideCollapse = collapse
    }
  }
}

const authCheck = function (menu) {
  // 后根遍历菜单树，如果子菜单有授权项，则父菜单有授权
  if (isArray(menu.children)) {
    let auth = false
    menu.children.forEach(item => {
      if (authCheck(item)) {
        auth = true
      }
    })
    menu.auth = auth
  } else {
    menu.auth = menu.path !== undefined ? checkPermission(menu.path) : true
  }
  return menu.auth
}
