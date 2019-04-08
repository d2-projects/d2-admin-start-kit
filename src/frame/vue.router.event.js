import Vue from 'vue'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { router, store } from 'modular-vue'

import util from '@/libs/util.js'
import { checkPermission } from '@/libs/Auth'

export default {
/**
 * 路由拦截
 * 权限验证
 */
  beforeEach (to, from, next) {
  // 进度条
    NProgress.start()
    // 关闭搜索面板
    store.commit('d2admin/search/set', false)
    if (to.name === '404') {
      if (!from.name) {
      // 直接在地址栏输入错误地址导致的404
        next()
      } else {
      // 路由切换导致的404
        next(new Error(`访问路径 “${to.fullPath}” 不存在，如有疑问请与管理员联系`))
        // https://github.com/d2-projects/d2-admin/issues/138
        NProgress.done()
      }
    } else if (to.meta.auth) {
      if (store.getters['session/loggedIn']) {
      // 已登录，则进行许可检查
        if (checkPermission(to.fullPath)) {
          next()
        } else {
        // 无权访问时显示提示信息
        // 产生该异常原因有：1、权限配置不合理，显示了无权访问的按钮等；2、地址栏输入无权访问的路径。
        // 以上情况均需要提醒管理员
          if (!from.name) {
          // 直接在地址栏输入未授权地址导致的403
            next({ name: '403', params: { path: to.fullPath } })
          } else {
          // 路由切换导致的403
            next(new Error(`未授权访问 “${to.fullPath}”，如有疑问请与管理员联系`))
          }
          // https://github.com/d2-projects/d2-admin/issues/138
          NProgress.done()
        }
      } else {
      // 没有登录的时候跳转到登录界面
      // 携带上登陆成功之后需要跳转的页面完整路径
        let path = { name: 'login' }
        if (to.fullPath !== '/' && to.fullPath !== '/index') {
          path.query = { redirect: to.fullPath }
        }
        next(path)
        // https://github.com/d2-projects/d2-admin/issues/138
        NProgress.done()
      }
    } else {
    // 不需要身份校验 直接通过
      next()
    }
  },

  afterEach (to) {
  // 进度条
    NProgress.done()
    // 多页控制 打开新的页面
    store.dispatch('d2admin/page/open', to)
    // 更改标题
    util.title(to.meta.title)
  },

  onError (err) {
    router.app.$message.error(err.message)
    Vue.config.errorHandler(err, router, err.message)
  }

}
