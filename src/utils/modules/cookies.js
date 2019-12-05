import Cookies from 'js-cookie'
/**
 * 设置cookies
 * @param {*} name
 * @param {*} value
 * @param {*} cookieSetting
 */
export function set (name = 'default', value = '', cookieSetting = {}) {
  let currentCookieSetting = {
    expires: 1
  }
  Object.assign(currentCookieSetting, cookieSetting)
  Cookies.set(`tao-${process.env.VUE_APP_VERSION}-${name}`, value, currentCookieSetting)
}
/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
export function get (name = 'default') {
  return Cookies.get(`tao-${process.env.VUE_APP_VERSION}-${name}`)
}

/**
 * @description 拿到 cookie 全部的值
 */
export function getAll () {
  return Cookies.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
export function remove (name = 'default') {
  return Cookies.remove(`tao-${process.env.VUE_APP_VERSION}-${name}`)
}
