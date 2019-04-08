// 访问后端服务的工具类
import serverConfig from 'serverConfig'

export default {
  getBaseUrl () {
    return serverConfig['service.baseUrl']
  },
  getUrl (name) {
    const prefix = 'service.' + name
    const baseUrl = serverConfig[prefix + '.baseUrl'] || serverConfig['service.baseUrl'] || ''
    return baseUrl + (serverConfig[prefix + '.url'] || name)
  }
}
