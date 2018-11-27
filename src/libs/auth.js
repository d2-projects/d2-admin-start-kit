import store from '@/store/index'

export function checkPermission (...uris) {
  const permissions = store.state.session.user.permissions
  console.log({ permissions, uris })
  // TODO 先简单实现验证思路，后续需要改进：1、采用缓冲减少匹配次数；2、使用树搜索算法提高匹配效率
  for (let i in uris) {
    for (let j in permissions) {
      if (uris[i].startsWith(permissions[j])) { // 针对带参路由的情况，先使用前向匹配
        console.log(`匹配成功：${uris[i]} => ${permissions[j]}`)
        return true
      }
    }
  }
  return false
}

export default {
  methods: {
    checkPermission
  }
}
