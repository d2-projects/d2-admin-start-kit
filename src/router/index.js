import Vue from 'vue'
import VueRouter from 'vue-router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store/index'

import util from '@/libs/util.js'
import { checkPermission } from '@/libs/auth.js'

// 路由数据
import routes from './routes'

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes
})

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
  // 进度条
  NProgress.start()
  // 关闭搜索面板
  store.commit('d2admin/search/set', false)
  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.matched.some(r => r.meta.requiresAuth)) {
    // 这里暂时将cookie里是否存有token作为验证是否登录的条件
    // 请根据自身业务需要修改
    const token = util.cookies.get('token')
    if (token && token !== 'undefined') {
      // 已登录，则进行许可检查
      if (
        !to.matched.some(r => r.meta.requiresAuth === 'check') ||
        checkPermission(to.fullPath)
      ) {
        next()
      } else {
        // 无权访问时通过 403 页面显示提示信息
        // 产生该异常原因有：1、权限配置不合理，显示了无权访问的按钮等；2、地址栏输入无权访问的路径。
        // 以上情况均需要提醒管理员
        next({
          name: '403',
          params: {
            uri: to.fullPath
          }
        })
      }
    } else {
      // 没有登录的时候跳转到登录界面
      // 携带上登陆成功之后需要跳转的页面完整路径
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    // 不需要身份校验 直接通过
    next()
  }
})

router.afterEach(to => {
  // 进度条
  NProgress.done()
  // 需要的信息
  const app = router.app
  const { name, params, query, fullPath } = to
  // 多页控制 打开新的页面
  app.$store.dispatch('d2admin/page/open', { name, params, query, fullPath })
  // 更改标题
  util.title(to.meta.title)
})

export default router
