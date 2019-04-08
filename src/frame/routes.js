import layoutHeaderAside from '@/layout/header-aside'

/**
 * 在主框架内显示
 */
export const frameRoute = {
  path: '/',
  name: 'frame',
  redirect: { name: 'index' },
  component: layoutHeaderAside,
  children: [
    // 首页 必须 name:index
    {
      path: 'index',
      name: 'index',
      meta: {
        auth: true
      },
      component: () => import('./view/index')
    },
    // 刷新页面 必须保留
    {
      path: 'refresh',
      name: 'refresh',
      hidden: true,
      component: {
        beforeRouteEnter (to, from, next) {
          next(instance => instance.$router.replace(from.fullPath))
        },
        render: h => h()
      }
    },
    // 页面重定向 必须保留
    {
      path: 'redirect/:route*',
      name: 'redirect',
      hidden: true,
      component: {
        beforeRouteEnter (to, from, next) {
          next(instance => instance.$router.replace(JSON.parse(from.params.route)))
        },
        render: h => h()
      }
    }
  ]
}

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('./view/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  // 403
  {
    path: '/403',
    name: '403',
    component: () => import('./view/error-page'),
    props: { code: 403 }
  },
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('./view/error-page'),
    props: { code: 404 }
  }
]

// 重新组织后导出
export default [
  frameRoute,
  ...frameOut,
  ...errorPage
]
