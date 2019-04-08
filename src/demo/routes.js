const meta = { auth: 'check' }

export default [
  {
    path: 'demo/auth',
    name: 'demo-auth',
    component: () => import('./view/auth'),
    meta: { ...meta, title: '查看权限' }
  },
  {
    path: 'demo/graph',
    name: 'demo-graph',
    component: () => import('./view/mxgraph'),
    meta: { title: 'mxGraph 测试' }
  },
  {
    path: 'demo/graph/editor',
    name: 'demo-graph-editor',
    component: () => import('./view/mxgraph/editor'),
    meta: { title: 'Graph 编辑器' }
  },
  {
    path: 'demo/params/:id',
    name: 'demo-params',
    props: true,
    component: () => import('./view/params'),
    meta: { ...meta, title: '参数路由', auth: true }
  },
  {
    path: 'demo/page1',
    name: 'demo-page1',
    component: () => import('./view/page1'),
    meta: { ...meta, title: '页面 1' }
  },
  {
    path: 'demo/page2',
    name: 'demo-page2',
    component: () => import('./view/page2'),
    meta: { ...meta, title: '页面 2' }
  },
  {
    path: 'demo/page3',
    name: 'demo-page3',
    component: () => import('./view/page3'),
    meta: { ...meta, title: '页面 3' }
  },
  {
    path: 'demo/validator',
    name: 'demo-validator',
    component: () => import('./view/validator'),
    meta: { ...meta, title: '输入校验' }
  }
]
