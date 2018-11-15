import { name, version } from '../package'

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
    asideCollapse: false
  },
  // 在读取持久化数据失败时默认页面
  page: {
    opened: [
      {
        name: 'index',
        fullPath: '/index',
        meta: {
          title: '首页',
          requiresAuth: false
        }
      }
    ]
  },
  // 版本
  releases: {
    name,
    version
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
        title: '经典',
        name: 'classic',
        preview: 'static/theme/classic/preview@2x.png'
      },
      {
        title: '简约',
        name: 'simple',
        preview: 'static/theme/simple/preview@2x.png'
      },
      {
        title: '宇宙',
        name: 'universe',
        backgroundImage: 'static/theme/universe/bg.jpg',
        preview: 'static/theme/universe/preview@2x.png'
      }
    ]
  },
  // 是否默认开启页面切换动画
  transition: {
    active: true
  },
  // 在读取持久化数据失败时默认用户信息
  user: {
    info: {
      name: 'Guest'
    }
  }
}
