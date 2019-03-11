#!/usr/bin/env node
/*
 * 临时解决 jest-util@23.4.0 在 nodejs v11.11.0 运行报错的问题，相关异常信息：
 * TypeError: Cannot assign to read only property 'Symbol(Symbol.toStringTag)' of object '#<process>'
 *     at exports.default (node_modules/jest-util/build/create_process_object.js:15:34)
*/
const fs = require('fs')
const chalk = require('chalk')
const targetFilePath = 'node_modules/jest-util/build/create_process_object.js'
const tag = 'fix jest-util@23.4.0 bug'

if (!fs.existsSync(targetFilePath)) {
  console.log(chalk.yellow(`skipped: ${targetFilePath}`))
  return
}
const targetFile = fs.readFileSync(targetFilePath, 'utf8')

if (targetFile.match(tag)) {
  console.log(chalk.green(`skipped: ${targetFilePath}`))
  return
}
const regex = /^\s*newProcess\[Symbol\.toStringTag\]\s*=\s*'process';\s*$/m
const match = targetFile.match(regex)
if (!match) {
  console.log(chalk.yellow(`${targetFilePath} file doesn't have a [${regex}].`))
  return
}

const oldString = match[0]
const newString = `\n/* ${tag}\n${oldString}\n*/\n`

fs.writeFileSync(targetFilePath, targetFile.replace(oldString, newString), 'utf8')
console.log(chalk.green(`replace '${oldString}' -> '${newString}'`))
