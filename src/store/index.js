import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from '@/plugin/vuex-along'

import session from './modules/session'
import d2admin from './modules/d2admin'
import setting from '@/setting.js'

Vue.use(Vuex)

vuexAlong.setKey(`${setting.releases.name}-${setting.releases.version}`)
vuexAlong.onlySession(true)
vuexAlong.watchSession(['session'], true)

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  modules: {
    session,
    d2admin
  },
  plugins: [vuexAlong]
})
