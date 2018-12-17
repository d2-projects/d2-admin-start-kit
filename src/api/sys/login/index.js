import request from '@/plugin/axios/index'

export function AccountLogin (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
