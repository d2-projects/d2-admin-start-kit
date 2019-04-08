/**
 * @/plugin/axios 与 @/store 存在循环依赖，导致 jest 报错，
 */
// jest.mock('@/plugin/axios', () => {})
/**
 * store account.js 引用的 message.css 存在语法错误，导致 jest 报错
 */
// jest.mock('modular-vue', () => {})

const { ANONYMOUS, LOGGEDIN, CHECK } = require('@/libs/Auth.Constant')
const { getPermissionType, forEachMatch, treeMatch } = require('@/libs/Auth')

const userPermissions = [
  '/login',
  '/demo/page1',
  '/demo/params/001',
  '/test/**',
  '/user/*/info/*'
]

describe('Auth 单元测试', () => {
  it('getPermissionType 功能验证', () => {
    expect(getPermissionType('/login')).toEqual(ANONYMOUS)
    expect(getPermissionType('/demo/graph')).toEqual(ANONYMOUS)

    expect(getPermissionType('/demo/page1')).toEqual(CHECK)
    expect(getPermissionType('/demo/page2')).toEqual(CHECK)
    expect(getPermissionType('/demo/page3')).toEqual(CHECK)

    expect(getPermissionType('/demo/graph/editor')).toEqual(LOGGEDIN)
    expect(getPermissionType('/user/01/info')).toEqual(LOGGEDIN)
    expect(getPermissionType('/test/test')).toEqual(LOGGEDIN)
  })

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
