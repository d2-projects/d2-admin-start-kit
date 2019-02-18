class ModulesLoader {
  constructor () {
    this.modules = []
    this.nameMap = {}
  }
  add (module) {
    if (!this.contains(module)) {
      this.nameMap[module.name] = module
      this.modules.push(module)
    }
  }
  getModules () {
    return this.modules
  }
  contains (module) {
    return !!this.nameMap[module.name]
  }
}
// 模块化应用实现类
export default class Modular {
  // 构造函数
  constructor (config) {
    config = config || {}
    let modules = config.modules || []
    this.application = config.application || {}
    this.strict = config.strict
    this.errors = []

    // 建立 name 查询索引
    const nameMapping = {}
    modules.forEach(module => {
      if (module.name === undefined) {
        this._log('模块名称未定义', module)
        return
      }
      const name = module.name
      if (nameMapping[name]) {
        this._log('模块名称重复', nameMapping[name], module)
        return
      }
      nameMapping[name] = module
    })

    // 解析依赖，模块排序
    const modulesLoader = new ModulesLoader()
    modulesLoader.add(nameMapping['modular-core'])

    function fillDepens (item) {
      if (modulesLoader.contains(item)) {
        return true
      }
      if (item.dependencies && item.dependencies.length) {
        const ds = item.dependencies
        const len = ds.length
        for (let i = 0; i < len; i++) {
          const d = ds[i]
          if (!modulesLoader.contains(item)) {
            // 依赖模块未解析
            if (nameMapping[d]) {
              if (fillDepens(nameMapping[d])) {
                // 依赖项加载成功
                continue
              } else {
                this._log('“' + item.name + '”依赖的模块“' + d + '”解析失败')
                return false
              }
            } else {
              this._log('“' + item.name + '”依赖的模块“' + d + '”不存在')
              return false
            }
          }
        }
        // 依赖项全部加载成功
      }
      modulesLoader.add(item)
      return true
    }
    modules.forEach(module => {
      fillDepens(module)
    })

    modules = modulesLoader.getModules()
    this.modules = modules

    // 组装扩展配置
    const points = {}
    const extens = {}
    modules.forEach(module => {
      if (module.extensionPoints) {
        const ps = module.extensionPoints
        for (let key in ps) {
          if (points[key]) {
            this._log('重复的 extensionPoints 定义 ' + key, points[key], module)
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
            this._log('extensionPoints 定义不存在 ' + key, ext[key], module)
          }
        }
      }
    })
    this.extensionPoints = points
    this.extensions = extens
  }
  // 启动模块化应用
  start () {
    this.modules.forEach(module => {
      if (module.activator && module.activator.start) {
        module.activator.start(this)
      }
    })
  }
  // 记录日志
  _log () {
    this.errors.push(arguments)
    console.log(arguments)
  }
}
