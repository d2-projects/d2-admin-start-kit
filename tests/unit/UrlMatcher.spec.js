import UrlMatcher from '@/libs/UrlMatcher'

const userPermissions = [
  '/login',
  '/demo/page1',
  '/demo/params/001',
  '/test/**',
  '/user/*/info/*'
]

describe('UrlMatcher 单元测试', () => {
  const matcher = new UrlMatcher()

  beforeEach(() => {
    matcher.reset(userPermissions)
  })

  it('match 功能验证', () => {
    // true
    expect(matcher.match(['/login'])).toBe(true)
    expect(matcher.match(['/demo/page1', '/noCheck'])).toBe(true)
    expect(matcher.match(['/test/test'])).toBe(true)
    expect(matcher.match(['/test/test/test/test'])).toBe(true)
    expect(matcher.match(['/user/01/info/001'])).toBe(true)
    // false
    // expect(matcher.match(['/user/01/info'])).toBe(false)
  })
})
