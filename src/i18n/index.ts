import Vue from 'vue'
import VueI18n from 'vue-i18n'

import cn from './lang/cn/index'
import ja from './lang/ja/index'
import en from './lang/en/index'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'cn',
  messages: {
    cn,
    ja,
    en
  }
})
