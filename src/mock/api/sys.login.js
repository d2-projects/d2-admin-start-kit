import Qs from 'qs'
import Mock from 'mockjs'
import Service from '@/libs/Service'

const userDB = [
  {
    username: 'admin',
    password: 'admin',
    uuid: 'admin-uuid',
    name: '管理员',
    permissions: [
      '/demo/auth',
      '/demo/page1',
      '/demo/page2',
      '/demo/page3',
      '/demo/test1',
      '/demo/test2',
      '/demo/test3'
    ]
  },
  {
    username: 'editor',
    password: 'editor',
    uuid: 'editor-uuid',
    name: '编辑',
    permissions: [
      '/demo/auth',
      '/demo/page1',
      '/demo/page2',
      '/demo/test1',
      '/demo/test2'
    ]
  },
  {
    username: 'user1',
    password: 'user1',
    uuid: 'user1-uuid',
    name: '用户1',
    permissions: [
      '/demo/auth',
      '/demo/page1',
      '/demo/test1'
    ]
  }
]

let errorCount = 0

Mock.mock(Service.getUrl('login'), 'post', ({ url, type, body }) => {
  const bodyObj = Qs.parse(body)
  const user = userDB.find(e => e.username === bodyObj.username && e.password === bodyObj.password)
  if (user) {
    errorCount = 0
    return {
      code: 0,
      msg: '登录成功',
      data: {
        ...user,
        token: 'd787syv8dys8cas80d9s0a0d8f79ads56f7s4d56f879a8as89fd980s7dg'
      }
    }
  } else {
    errorCount++
    return {
      code: 401,
      msg: '用户名或密码错误',
      data: {
        requiredInputCode: errorCount >= 3
      }
    }
  }
})
