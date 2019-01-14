/**
 * @/plugin/axios 与 @/store 存在循环依赖，导致 jest 报错，
 * 此处屏蔽 @/plugin/axios 对当前测试案例无影响
 */
jest.mock('@/plugin/axios', () => {})
/**
 * util.log 依赖 webpack externals ‘logger’ 导致报错，暂时无法通过配置解决
 */
jest.mock('@/libs/util.log', () => {})

const { forEachMatch, treeMatch } = require('@/libs/Auth')

const userPermissions = [
  '/login',
  '/demo/page1',
  '/demo/params/001',
  '/test/**',
  '/user/*/info/*'
]

describe('Auth 单元测试', () => {
  it('forEachMatch 功能验证', () => {
    // true
    expect(forEachMatch(['/login'], userPermissions)).toBe(true)
    expect(forEachMatch(['/demo/page1', '/noCheck'], userPermissions)).toBe(true)
    // expect(forEachMatch(['/test/test'], userPermissions)).toBe(true)
    // expect(forEachMatch(['/test/test/test/test'], userPermissions)).toBe(true)
    // expect(forEachMatch(['/user/01/info/001'], userPermissions)).toBe(true)
    // false
    expect(forEachMatch(['/user/01/info'], userPermissions)).toBe(false)
  })

  it('treeMatch 功能验证', () => {
    // true
    expect(treeMatch(['/login'], userPermissions)).toBe(true)
    expect(treeMatch(['/demo/page1', '/noCheck'], userPermissions)).toBe(true)
    expect(treeMatch(['/test/test'], userPermissions)).toBe(true)
    expect(treeMatch(['/test/test/test/test'], userPermissions)).toBe(true)
    expect(treeMatch(['/user/01/info/001'], userPermissions)).toBe(true)
    // false
    expect(forEachMatch(['/user/01/info'], userPermissions)).toBe(false)
  })
})
