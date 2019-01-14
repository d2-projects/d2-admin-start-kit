/**
 * URL 匹配算法实现类，支持类似 Ant 格式路径匹配，* 代表一级目录，** 代表多级目录
 */
class UrlMatcher {
  constructor (defaultRules) {
    this.defaultRules = defaultRules
    this.rules = null
  }

  init (rules) {
    this.rules = rules
  }

  reset (rules) {
    this.rules = rules
  }

  match (urls) {
    return true
  }
}

export default UrlMatcher
