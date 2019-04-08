module.exports = function (api) {
  api.cache(true)
  const presets = []
  const plugins = []

  if (process.env.NODE_ENV === 'test') {
    presets.push([
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ])
    plugins.push(
      // 解决 jest 对动态导入（()=>import()）的支持问题
      '@babel/plugin-syntax-dynamic-import',
      // 使用 require-context-hook 插件解决 jest 不能解析 require.context 的问题，仅限 test 模式使用
      'require-context-hook'
    )
  } else {
    presets.push('@vue/app')
    plugins.push(
      // https://babeljs.io/docs/en/babel-plugin-transform-runtime/
      '@babel/plugin-transform-runtime',
      // 使用 component 插件实现 Element UI 按需加载
      [
        'component',
        {
          libraryName: 'element-ui',
          styleLibraryName: 'theme-chalk'
        }
      ]
    )
  }

  return {
    presets,
    plugins
  }
}
