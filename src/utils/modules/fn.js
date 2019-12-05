import shortid from 'shortid'
import {
  get,
  cloneDeep
} from 'lodash'

/**
 * @description 尝试在一个数据上取值 可以有多个备选 keyName
 * @param {Object} parent 被取值的数据
 * @param {Array} paths 可供选择的取值路径
 * @param {*} defaultValue 默认值
 */
export function getFromMulti (parent = {}, paths = [], defaultValue = '') {
  let result = defaultValue
  for (let pathIndex = 0; pathIndex < paths.length; pathIndex++) {
    const path = paths[pathIndex]
    const value = get(parent, path, defaultValue)
    if (value !== defaultValue) {
      result = value
      break
    }
  }
  return result
}

/**
 * @description 给指定的数组添加唯一 id 字段
 * @description https://github.com/dylang/shortid
 * @param {Array} source 数据源
 * @param {String} idKeyName 字段名
 */
export function arrayAddUniqueId (source = [], idKeyName = 'id') {
  return source.map(item => {
    let currentItem = cloneDeep(item)
    currentItem[idKeyName] = shortid.generate()
    return currentItem
  })
}
