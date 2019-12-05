import layoutHeaderAside from '@/layout/header-aside'
import util from '@/utils'
/**
 * 在主框架内显示
 */
const frameIn = [{
  path: '/',
  redirect: {
    name: 'index'
  },
  component: layoutHeaderAside,
  children: [
    // 首页
    {
      path: 'index',
      name: 'index',
      meta: {
        auth: true
      },
      component: util.import('system/index')
    },
    // 演示页面
    {
      path: 'page1',
      name: 'page1',
      meta: {
        title: '页面 1',
        auth: true
      },
      component: util.import('demo/page1')
    },
    {
      path: 'page2',
      name: 'page2',
      meta: {
        title: '页面 2',
        auth: true
      },
      component: util.import('demo/page2')
    },
    {
      path: 'page3',
      name: 'page3',
      meta: {
        title: '页面 3',
        auth: true
      },
      component: util.import('demo/page3')
    },
    // 系统 前端日志
    {
      path: 'log',
      name: 'log',
      meta: {
        title: '前端日志',
        auth: true
      },
      component: util.import('system/log')
    },
    // 刷新页面 必须保留
    {
      path: 'refresh',
      name: 'refresh',
      hidden: true,
      component: util.import('system/function/refresh')
    },
    // 页面重定向 必须保留
    {
      path: 'redirect/:route*',
      name: 'redirect',
      hidden: true,
      component: util.import('system/function/redirect')
    }
  ]
}]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: util.import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [{
  path: '*',
  name: '404',
  component: util.import('system/error/404')
}]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
