// 使用 babel 插件解决 jest 不能解析 require.context 的问题
// 需配合 babel.config.js 配置
require('babel-plugin-require-context-hook/register')()
