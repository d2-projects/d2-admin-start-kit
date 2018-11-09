const express = require('express')
const path = require('path')
const open = require('open')
const app = express()

app.use(express.static(path.join(__dirname, 'target/dist'))) // 注意这里使用path.join(__dirname, 'dist')而不是'dist'，虽然在命令行中执行起来效果是一样的，不过pkg打包会无法识别到dist目录

const server = app.listen(8888, '127.0.0.1', function () {
  const host = server.address().address
  const port = server.address().port
  console.log(`Server start successfully on http://${host}:${port}`)
  open(`http://${host}:${port}`)
})
