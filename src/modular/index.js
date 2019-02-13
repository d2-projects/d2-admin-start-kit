// 模块化应用实现类
export default class Modular {
  constructor (config) {
    config = config || {}
    let modules = config.modules || []
    this.application = config.application || {}
    this.strict = config.strict

    // 建立 name 查询索引
    const nameMapping = {}
    modules.forEach(module => {
      if (module.name === undefined) {
        console.log('模块名称未定义', module)
        return
      }
      const name = module.name
      if (nameMapping[name]) {
        console.log('模块名称重复', nameMapping[name], module)
        return
      }
      nameMapping[name] = module
    })

    // 解析依赖，模块排序
    const sortModules = []
    sortModules.push(nameMapping['modular-core'])
    function fillDepens (item) {
      if (sortModules.find(m => m.name === item.name)) {
        return true
      }
      if (item.dependencies && item.dependencies.length) {
        const ds = item.dependencies
        const len = ds.length
        for (let i = 0; i < len; i++) {
          const d = ds[i]
          if (sortModules.find(m => m.name === d) === undefined) {
            if (nameMapping[d]) {
              if (fillDepens(nameMapping[d])) {
                // 依赖项都已加载
                sortModules.push(item)
                continue
              } else {
                console.log('“' + item.name + '”依赖的模块“' + d + '”解析失败')
                return false
              }
            } else {
              console.log('“' + item.name + '”依赖的模块“' + d + '”不存在')
              return false
            }
          }
        }
      } else {
        // 无依赖项
        sortModules.push(item)
      }
      return true
    }
    modules.forEach(module => {
      fillDepens(module)
    })
    this.modules = sortModules
    modules = sortModules

    // 组装扩展配置
    const points = {}
    const extens = {}
    modules.forEach(module => {
      if (module.extensionPoints) {
        const ps = module.extensionPoints
        for (let key in ps) {
          if (points[key]) {
            console.log('重复的 extensionPoints 定义 ' + key, points[key], module)
          } else {
            points[key] = { module: module.name, config: ps[key] }
          }
        }
      }
      if (module.extensions) {
        const ext = module.extensions
        for (let key in ext) {
          if (points[key]) {
            extens[key] = extens[key] || {}
            Object.assign(extens[key], ext[key])
          } else {
            console.log('extensionPoints 定义不存在' + key, ext[key], module)
          }
        }
      }
    })
    this.extensionPoints = points
    this.extensions = extens
  }
  start () {
    console.log('Start Modules >>>>>>')
    this.modules.forEach(module => {
      if (module.activator && module.activator.start) {
        module.activator.start(this)
      }
    })
  }
}
