// 菜单数据
export default [
  {
    title: '演示',
    icon: 'flask',
    children: [
      // { path: '/index', title: '首页', icon: 'home' },
      {
        title: '权限演示',
        icon: 'universal-access',
        children: [
          { path: '/demo/auth', title: '查看权限', icon: 'street-view' },
          { path: '/demo/page1', title: '页面 1' },
          { path: '/demo/page2', title: '页面 2' },
          { path: '/demo/page3', title: '页面 3' }
        ]
      },
      {
        title: '参数路由',
        icon: 'map-signs',
        children: [
          { path: '/demo/params/1', title: '编号 1', icon: 'map-marker' },
          { path: '/demo/params/2', title: '编号 2', icon: 'map-marker' },
          { path: '/demo/params/1?name=hello', title: 'query 测试', icon: 'map-marker' }
        ]
      },
      {
        title: 'mxGraph',
        icon: 'sitemap',
        children: [
          { path: '/demo/graph', title: 'Hello, World!', icon: 'braille' },
          { path: '/demo/graph/editor', title: 'Graph 编辑器', icon: 'object-group' }
        ]
      }
    ]
  },
  {
    title: '设置',
    icon: 'gear',
    children: [
      { path: '/demo/page1', title: '页面 1' },
      { path: '/demo/page2', title: '页面 2' },
      { path: '/demo/page3', title: '页面 3' }
    ]
  }
]
