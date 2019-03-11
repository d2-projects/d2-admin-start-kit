/* 临时解决 jest-util@23.4.0 在 nodejs v11.11.0 运行报错的问题，相关异常信息：
      TypeError: Cannot assign to read only property 'Symbol(Symbol.toStringTag)' of object '#<process>'
        at exports.default (node_modules/jest-util/build/create_process_object.js:15:34)
*/
const fs = require('fs')
const src = 'node_modules/jest-util/build/create_process_object.js'

console.log('fix jest-util@23.4.0 bug  ......')

fs.readFile(src, 'utf8', function (err, data) {
  if (err) {
    return console.error(err)
  }
  const result = data.replace(
    /^\s*newProcess\[Symbol\.toStringTag\]\s*=\s*'process';\s*$/m,
    '\n  // newProcess[Symbol.toStringTag] = \'process\'; // fix jest-util@23.4.0 bug\n'
  )
  fs.writeFile(src, result, 'utf8', function (err) {
    if (err) return console.error(err)
  })
})

console.log('fix end')
