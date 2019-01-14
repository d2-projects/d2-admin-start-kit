import { cloneDeep } from 'lodash'
/**
 * Page组件内置的多页数据管理器，解决如下问题：
 * 带参路由（例如：/user/:id）多组参数使用同一个组件实例，
 * 需要在组件内部对多个组参数对应的多组数据进行管理（初始化、切换、缓存）。
 */
class DatasManager {
  constructor (vm) {
    this.vm = vm
    this.datas = {}
    this.dataTemplate = cloneDeep(this.vm.$data)
  }
  enter (to, from) {
    const key = to.fullPath
    let data = this.datas[key]
    if (!data) {
      data = cloneDeep(this.dataTemplate)
      this.datas[key] = data
    }
    Object.assign(this.vm.$data, data)
  }
  update (to, from) {
    this.leave(to, from)
    this.enter(to, from)
  }
  leave (to, from) {
    const key = from.fullPath
    let data = this.datas[key]
    if (!data) {
      data = cloneDeep(this.dataTemplate)
      this.datas[key] = data
    }
    Object.assign(data, this.vm.$data)
  }
}
const setupKey = '_page_datas_manager'
DatasManager.get = function (vm) {
  if (!vm[setupKey]) {
    vm[setupKey] = new DatasManager(vm)
  }
  return vm[setupKey]
}

// Vue组件Mixin
export default {
  // 第一次进入或从其他组件对应路由进入时触发
  beforeRouteEnter (to, from, next) {
    // const key = to.fullPath
    next(vm => {
      // vm._switchData(key)
      DatasManager.get(vm).enter(to, from)
    })
  },
  // 在同一组件对应的多个路由间切换时触发
  beforeRouteUpdate (to, from, next) {
    DatasManager.get(this).update(to, from)
    next()
  },
  // 导航离开该组件的对应路由时调用
  beforeRouteLeave (to, from, next) {
    DatasManager.get(this).leave(to, from)
    next()
  }
}
