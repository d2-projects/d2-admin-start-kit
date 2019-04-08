// FIXME 临时跑通逻辑
import menu from '@/menu'
import { frameRoute } from './routes'
import util from '@/libs/util'
import setting from '@/setting'

export default {
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', [ frameRoute ])
    // 设置菜单
    this.$store.dispatch('d2admin/menu/set', menu)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menu)
  },
  mounted () {
    // 展示系统信息
    // this.$store.commit('d2admin/releases/versionShow')
    util.log.capsule(
      setting.releases.name,
      `v${setting.releases.version} (${setting.releases.buildTime})`
    )
    if (process.env.NODE_ENV === 'development') {
      console.log(process.env)
    }
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}
