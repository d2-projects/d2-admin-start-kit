import util from '@/libs/util'
/**
 * 多页面管理器，能够管理多个子页面，通过router-view显示子页面，通过tabs操作子页面
 */
class PageManager {
  constructor (vm) {
    this.vm = vm
    this.componentName = vm.$options.name
    if (!this.componentName) {
      util.log.danger('PageManager 对应组件必须具有有效的 name ！')
      console.log(vm.$options)
    }
    this.route = null // 管理器组件对应的路由信息 √
    this.childrenRoute = [] // 所有子页面路由对象集合（在route基础上补充componentName）
    this.currentChild = '' // 当前子页面fullPath √
    this.openedChildren = [] // 当前已经打开的子页面fullPath集合

    this.r2c = {} // 子页面路由name=>组件name映射
  }
  enter (to) {
    this.currentChild = to.fullPath
    if (!this.route) {
      // 查找管理器组件对应路由
      const route = to.matched.find(r => r.instances.default.$options.name === this.componentName)
      if (route) {
        this.route = route
        if (!route.name) {
          let { path, params, query, fullPath } = route
          util.log.danger(`组件“${this.componentName}”对应的路由${JSON.stringify({ path, params, query, fullPath })}没有定义 name ！`)
          console.log(route)
        }
      }
    }
    // 目标页面信息
    const pageRoute = to.matched.find(r => r.name === to.name) // 正在打开的页面路由详细信息
    const pageRouteName = pageRoute.name // 页面路由name
    let pageComponentName = pageRoute.instances.default.$options.name // 页面组件name，可能为undefined
    if (!pageComponentName) {
      pageComponentName = 'undefined'
    }
    if (!this.r2c[pageRouteName]) {
      this.r2c[pageRouteName] = pageComponentName
    }
  }
}

const setupKey = '_pages_manager'
PageManager.cache = new WeakMap()

PageManager.get = function (vm) {
  if (!vm[setupKey]) {
    vm[setupKey] = new PageManager(vm)
    PageManager.cache.set(vm, vm[setupKey])
  }
  return vm[setupKey]
}

// Vue组件Mixin
export default {
  // 第一次进入或从其他组件对应路由进入时触发
  beforeRouteEnter (to, from, next) {
    // 获得to对应的路由详细信息对象route
    console.log('>>>>>>>>>>>> beforeRouteEnter')
    next(vm => {
      PageManager.get(vm).enter(to)
    })
  },
  // 在同一组件对应的多个路由间切换时触发
  beforeRouteUpdate (to, from, next) {
    console.log('>>>>>>>>>>>> beforeRouteUpdate')
    next()
  },
  // 导航离开该组件的对应路由时调用
  beforeRouteLeave (to, from, next) {
    console.log('>>>>>>>>>>>> beforeRouteLeave')
    next()
  }
}
