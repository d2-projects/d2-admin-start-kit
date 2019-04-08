// 服务端配置文件
// 可以在部署或运行时改变参数，从而影响前端行为
export default {
  'service.baseUrl': '/api/',
  'service.timeout': 5000, // 请求超时时间
  // login
  'service.login.url': 'login',

  // jest 测试用数据
  'service.test1.baseUrl': '/test1/',
  'service.test1.url': 'hello',

  'service.test2.baseUrl': '/test2/',

  'service.test3.baseUrl': '', // ''相当于未定义
  'service.test3.url': 'test3/3test'
}
