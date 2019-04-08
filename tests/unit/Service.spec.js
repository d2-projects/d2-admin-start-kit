import Service from '@/libs/Service'

describe('Service 单元测试', () => {
  it('getUrl 功能验证', () => {
    expect(Service.getUrl('login')).toEqual('/api/login')
    expect(Service.getUrl('test1')).toEqual('/test1/hello')
    expect(Service.getUrl('test2')).toEqual('/test2/test2')
    expect(Service.getUrl('test3')).toEqual('/api/test3/3test')
    expect(Service.getUrl('test4')).toEqual('/api/test4')
  })
})
