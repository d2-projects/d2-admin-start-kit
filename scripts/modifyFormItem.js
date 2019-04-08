const fs = require('fs')
const src = 'node_modules/element-ui/packages/form/src/form-item.vue'
const target = 'src/components/extends/form-item.vue'
const exp = /<template>[\d\D]*<\/template>/

console.log('Modify FormItem ......')
// 扩展 ElementUI FormItem 组件，需要拷贝 template 代码，并进行修改
// 读取源码
fs.readFile(src, 'utf8', function (err, data) {
  if (err) {
    return console.error(err)
  }
  const result = data.match(exp)
  if (!result || !result[0]) {
    return console.error('读取 form-item 的 template 代码失败')
  }
  let template = result[0]
  // 修改
  template = template.replace(/\bvalidateMessage\b/g, 'validateMessageDisplay').replace(/\s$/mg, '')
  // 写入目标
  fs.readFile(target, 'utf8', function (err, data) {
    if (err) {
      return console.error(err)
    }
    const result = data.replace(exp, template)
    fs.writeFile(target, result, 'utf8', function (err) {
      if (err) return console.error(err)
    })
  })
})

console.log('OK!')
