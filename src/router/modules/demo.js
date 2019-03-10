const meta = { auth: 'check' }

export default [
  {
    path: 'demo/auth',
    name: 'demo-auth',
    component: () => import('@/pages/demo/auth'),
    meta: { ...meta, title: '查看权限' }
  },
  {
    path: 'demo/graph',
    name: 'demo-graph',
    component: () => import('@/pages/demo/mxgraph'),
    meta: { title: 'mxGraph 测试' }
  },
  {
    path: 'demo/graph/editor',
    name: 'demo-graph-editor',
    component: () => import('@/pages/demo/mxgraph/editor'),
    meta: { title: 'Graph 编辑器' }
  },
  {
    path: 'demo/params/:id',
    name: 'demo-params',
    props: true,
    component: () => import('@/pages/demo/params'),
    meta: { ...meta, title: '参数路由', auth: true }
  },
  {
    path: 'demo/page1',
    name: 'demo-page1',
    component: () => import('@/pages/demo/page1'),
    meta: { ...meta, title: '页面 1' }
  },
  {
    path: 'demo/page2',
    name: 'demo-page2',
    component: () => import('@/pages/demo/page2'),
    meta: { ...meta, title: '页面 2' }
  },
  {
    path: 'demo/page3',
    name: 'demo-page3',
    component: () => import('@/pages/demo/page3'),
    meta: { ...meta, title: '页面 3' }
  }
]
