// 许可类型常量
import { ANONYMOUS, CHECK } from '@/libs/Auth.Constant'

export default {
  // 快捷键
  // 支持快捷键 例如 ctrl+shift+s
  hotkey: {
    search: {
      open: 's',
      close: 'esc'
    }
  },
  // 侧边栏默认折叠状态
  menu: {
    asideCollapse: false,
    showNoAuth: false
  },
  // 在读取持久化数据失败时默认页面
  page: {
    opened: [
      {
        name: 'index',
        fullPath: '/index',
        meta: {
          title: '首页',
          auth: true
        }
      }
    ]
  },
  // 版本
  releases: {
    name: process.env.VUE_APP_NAME,
    version: process.env.VUE_APP_VERSION,
    buildTime: process.env.VUE_APP_BUILD_TIME
  },
  // 菜单搜索
  search: {
    enable: true
  },
  // 注册的主题
  theme: {
    list: [
      {
        title: '夜晚',
        name: 'night',
        backgroundImage: 'static/theme/night/bg.jpg',
        preview: 'static/theme/night/preview@2x.png'
      },
      {
        title: '简约',
        name: 'simple',
        preview: 'static/theme/simple/preview@2x.png'
      }
    ]
  },
  // 是否默认开启页面切换动画
  transition: {
    active: true
  },
  // 许可类型取值有：
  // 1、ANONYMOUS，允许匿名访问；
  // 2、LOGGEDIN，登录就可以访问；
  // 3、CHECK，需要检查当前用户许可
  // 不在此处配置的许可取值为 loggedIn
  permissions: {
    '/login': ANONYMOUS,
    '/demo/graph': ANONYMOUS,
    '/demo/page1': CHECK,
    '/demo/page2': CHECK,
    '/demo/page3': CHECK
  }
}
