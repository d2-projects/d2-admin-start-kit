import Qs from 'qs'
import request from '../plugin/axios'
import serverConfig from 'serverConfig'

export function AccountLogin (data) {
  return request({
    url: serverConfig['service.login.url'],
    method: 'post',
    data,
    transformRequest: [function (data) {
      data = Qs.stringify(data)
      return data
    }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
