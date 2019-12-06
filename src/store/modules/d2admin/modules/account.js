import {
  Message,
  MessageBox
} from 'element-ui'
import util from '@/utils'
import router from '@/router'
import api from '@/api'

export default context => ({
  namespaced: true,
  actions: {
    /**
     * @description 登录
     * @param {Object} vuex context
     * @param {Object} payload username {String} 用户账号
     * @param {Object} payload password {String} 密码
     * @param {Object} payload route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
     */
    async login ({
      dispatch
    }, params) {
      try {
        const data = await api.USER_LOGIN(params)
        // 设置 cookie 一定要存 uuid 和 token 两个 cookie
        // 整个系统依赖这两个数据进行校验和存储
        // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
        // token 代表用户当前登录状态 建议在网络请求中携带 token
        // 如有必要 token 需要定时更新，默认保存一天
        util.cookies.set('uuid', data.uuid)
        util.cookies.set('token', data.token)
        // 设置 vuex 用户信息
        await dispatch('d2admin/user/set', data, {
          root: true
        })
        // 用户登录后从持久化数据加载一系列的设置
        await dispatch('load')
        // 显示提示信息
        Message({
          message: '登录成功',
          type: 'success'
        })
        // 结束
        return Promise.resolve()
      } catch (error) {
        // 结束
        return Promise.reject(error)
      }
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} vuex context
     * @param {Object} payload focus {Boolean} 强制登出 没有任何提示
     * @param {Object} payload remote {Boolean} 需要服务端登出
     * @param {Object} payload local {Boolean} 需要本地登出
     * @param {Object} payload back {Boolean} 返回当前页面
     */
    logout ({
      commit,
      dispatch
    }, {
      focus = false,
      remote = true,
      local = true,
      back = false
    } = {}) {
      /**
       * @description 注销
       */
      async function logout () {
        // 请求登出接口
        // 不管成功与否都要进行下一步，所以不用 await 了
        if (local) {
          // 删除 cookie
          util.cookies.remove('token')
          util.cookies.remove('uuid')
          // 清空 vuex 用户信息
          await dispatch('d2admin/user/set', {}, {
            root: true
          })
        }
        // 跳转路由
        let redirect = ''
        if (back) {
          if (['login'].indexOf(router.app.$route.name) < 0) {
            redirect = router.app.$route.fullPath
          } else {
            redirect = router.app.$route.query.redirect
          }
        }
        router.push({
          name: 'login',
          query: {
            ...redirect ? {
              redirect
            } : {}
          }
        })
      }
      // 判断是否需要确认
      if (!focus) {
        commit('d2admin/gray/set', true, {
          root: true
        })
        MessageBox.confirm('确定要注销当前用户吗', '注销用户', {
          type: 'warning'
        })
          .then(() => {
            commit('d2admin/gray/set', false, {
              root: true
            })
            logout()
          })
          .catch(() => {
            commit('d2admin/gray/set', false, {
              root: true
            })
            Message({
              message: '取消注销操作'
            })
          })
      } else {
        logout()
      }
    },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} vuex context
     */
    async load ({
      dispatch
    }) {
      // DB -> store 加载用户名
      await dispatch('d2admin/user/load', null, {
        root: true
      })
      // DB -> store 加载主题
      await dispatch('d2admin/theme/load', null, {
        root: true
      })
      // DB -> store 加载页面过渡效果设置
      await dispatch('d2admin/transition/load', null, {
        root: true
      })
      // DB -> store 持久化数据加载上次退出时的多页列表
      await dispatch('d2admin/page/openedLoad', null, {
        root: true
      })
      // DB -> store 持久化数据加载侧边栏折叠状态
      await dispatch('d2admin/menu/asideCollapseLoad', null, {
        root: true
      })
      // DB -> store 持久化数据加载全局尺寸
      await dispatch('d2admin/size/load', null, {
        root: true
      })
      // DB -> store 持久化数据加载颜色设置
      await dispatch('d2admin/color/load', null, {
        root: true
      })
    }
  }
})
