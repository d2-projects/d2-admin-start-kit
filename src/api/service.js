import store from '@/store'
import axios from 'axios'
import {
  Message,
  MessageBox
} from 'element-ui'
import util from '@/utils'

// 记录和显示错误
function errorLog (error) {
  store.dispatch('d2admin/log/push', {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error
    }
  })
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.error(error)
  }
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
}

const service = axios.create()

service.interceptors.response.use(
  async response => {
    const dataAxios = response.data
    if (dataAxios.code === 0) {
      // 正常返回数据
      return dataAxios.data
    } else {
      const error = new Error(dataAxios.msg)
      // 需要重新登录
      // 50008 - 无效的 token
      // 50012 - 其它客户端登录
      // 50014 - token 过期
      if ([
        50008,
        50012,
        50014
      ].indexOf(dataAxios.code) >= 0) {
        await MessageBox.alert('请重新登录', '身份验证失败', {
          showClose: false,
          closeOnPressEscape: false
        })
        store.dispatch('d2admin/account/logout', {
          focus: true,
          remote: false,
          back: true
        })
      } else {
        errorLog(error)
      }
      return Promise.reject(error)
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export function request (config) {
  const token = util.cookies.get('token')
  let configDefault = {
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    timeout: 5000,
    baseURL: process.env.VUE_APP_API,
    data: {}
  }
  return service(Object.assign(configDefault, config))
}
