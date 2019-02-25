class ModulesLoader {
  constructor () {
    this._modules = []
    this._nameMap = {}
  }
  add (module) {
    if (!this.contains(module)) {
      this._nameMap[module.name] = module
      this._modules.push(module)
    }
  }
  getModules () {
    return this._modules
  }
  contains (module) {
    return !!this._nameMap[module.name]
  }
}
// 模块化应用实现类
export default class Modular {
  // 构造函数
  constructor (config) {
    config = config || {}
    let modules = config.modules || []
    let app = config.application || {}
    app.name = app.name || 'Application'
    this.strict = !!config.strict // 严格模式，暂未使用，保留
    this.errors = [] // 异常信息

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

    // TODO 处理优先加载模块
    // modulesLoader.add(nameMapping['modular-core'])

    function fillDepens (item) {
      if (modulesLoader.contains(item)) {
        return true
      }
      if (item.dependencies && item.dependencies.length) {
        item.dependencies = Object.freeze(item.dependencies)
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
    // 处理应用配置
    fillDepens(app)

    modules = modulesLoader.getModules()

    // 组装扩展配置
    const points = {}
    const extens = {}
    const len = modules.length
    for (let i = 0; i < len; i++) {
      let module = modules[i]
      if (module.extensionPoints) {
        module.extensionPoints = Object.freeze(module.extensionPoints)
        const ps = module.extensionPoints
        for (let key in ps) {
          if (points[key]) {
            this._log('重复的 extensionPoint 定义 ' + key, points[key], module)
          } else {
            points[key] = { module: module.name, config: ps[key] }
          }
        }
      }
      if (module.extensions) {
        module.extensions = Object.freeze(module.extensions)
        const ext = module.extensions
        for (let key in ext) {
          if (points[key]) {
            extens[key] = extens[key] || {}
            Object.assign(extens[key], ext[key])
          } else {
            this._log('extensionPoint 定义不存在 ' + key, ext[key], module)
          }
        }
      }
      modules[i] = Object.freeze(module)
    }
    this._application = Object.freeze(app) // 应用配置
    this._modules = Object.freeze(modules)
    this._extensionPoints = Object.freeze(points)
    this._extensions = Object.freeze(extens)
  }
  // 获取应用配置
  getApplication () {
    return this._application
  }
  // 获取指定名称的模块配置
  getModule (name) {
    return this._modules[name]
  }
  // 获取全部模块配置
  getModules () {
    return this._modules
  }
  // 获取指定名称的扩展配置
  getExtension (name) {
    return this._extensions[name] || {}
  }
  // 获取指定名称的扩展点定义
  getExtensionPoint (name) {
    return this._extensionPoints[name] || {}
  }
  // 启动模块化应用
  start () {
    this._modules.forEach(module => {
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
