import Vue from 'vue'
import Vuex from 'vuex'

import vuexAlong from './vuex-along'
import setting from '@/setting'

// 初始化 Vuex
Vue.use(Vuex)
vuexAlong.setKey(`${setting.name}-${setting.version}`)
vuexAlong.onlySession(true)
vuexAlong.watchSession(['session'], true)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  plugins: [vuexAlong]
})
