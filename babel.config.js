module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    // 使用 component 插件实现 Element UI 按需加载
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
