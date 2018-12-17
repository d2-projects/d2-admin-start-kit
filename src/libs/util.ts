import log from './util.log'
import cookies from './util.cookies'

let util:any = {
  cookies,
  log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText:string) {
  const processTitle = process.env.VUE_APP_TITLE || 'D2Admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url:string) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-menu-link')
  document.body.appendChild(a)
  a.click()
  // @ts-ignore
  document.body.removeChild(document.getElementById('d2admin-menu-link'))
}

export default util
