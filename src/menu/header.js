// 菜单 顶栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '页面',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '页面 1' },
      { path: '/page2', title: '页面 2' },
      { path: '/page3', title: '页面 3' }
    ]
  },
  // 恰饭
  ...process.env.VUE_APP_BUILD_MODE === 'TRAVIS' ? [
    {
      path: 'https://gio.ren/w/nP2OALom',
      title: 'Web进阶教程',
      icon: 'book'
    }
  ] : []
]
