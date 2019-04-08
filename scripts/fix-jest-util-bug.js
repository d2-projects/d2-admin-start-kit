#!/usr/bin/env node
/*
 * 临时解决 jest-util@23.4.0 在 nodejs v11.11.0 运行报错的问题，相关异常信息：
 * TypeError: Cannot assign to read only property 'Symbol(Symbol.toStringTag)' of object '#<process>'
 *     at exports.default (node_modules/jest-util/build/create_process_object.js:15:34)
 */
const fs = require('fs')
const chalk = require('chalk')
const targetFilePaths = [
  'node_modules/jest-util/build/create_process_object.js',
  'node_modules/@vue/cli-plugin-unit-jest/node_modules/jest-util/build/create_process_object.js'
]
const tag = 'fix jest-util@23.4.0 bug'

function fix (filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(chalk.yellow(`noexist: ${filePath}`))
    return
  }
  const targetFile = fs.readFileSync(filePath, 'utf8')
  if (targetFile.match(tag)) {
    console.log(chalk.green(`fixed: ${filePath}`))
    return
  }
  const regex = /^\s*newProcess\[Symbol\.toStringTag\]\s*=\s*'process';\s*$/m
  const match = targetFile.match(regex)
  if (!match) {
    console.log(chalk.yellow(`${filePath} file doesn't have a [${regex}].`))
    return
  }
  const oldString = match[0]
  const newString = `\n/* ${tag}\n${oldString}\n*/\n`
  fs.writeFileSync(filePath, targetFile.replace(oldString, newString), 'utf8')
  console.log(chalk.green(`replace '${oldString}' -> '${newString}'`))
}

targetFilePaths.forEach(filePath => fix(filePath))
