let unll, ll, sl, unsl
let onlySession = false
const LOCALSTORAGE = 0
const SESSIONSTORAGE = 1
let KEY = 'vuex-along'
const ls = window.localStorage
const ss = window.sessionStorage

const vuexAlong = store => {
  initAlong(store)
  store.subscribe(function (mutation, state) {
    saveLocal(state)
    saveSession(state)
  })
}
export default vuexAlong

const saveLocal = state => {
  if (onlySession) return
  setItem(KEY, filter(ll, unll, state), LOCALSTORAGE)
}

const saveSession = state => {
  if (!sl && !unsl && !onlySession) return
  setItem(KEY, filter(sl, unsl, state), SESSIONSTORAGE)
}

const filter = (s1, s2, state) => {
  let obj = {}
  if (s1) {
    for (let i of s1) {
      obj[i] = state[i]
    }
  } else if (s2) {
    for (let i in state) {
      if (s2.indexOf(i) > -1) continue
      obj[i] = state[i]
    }
  } else {
    obj = state
  }
  return obj
}

/**
 * Init this plugin when store init
 */
const initAlong = store => {
  let obj = {}
  if (!onlySession && getItem(KEY, LOCALSTORAGE))Object.assign(obj, getItem(KEY, LOCALSTORAGE))
  if (getItem(KEY, SESSIONSTORAGE))Object.assign(obj, getItem(KEY, SESSIONSTORAGE))
  store.replaceState(Object.assign(store.state, obj))
}

const setWatch = (arry, isWatch = true, type) => {
  if (!Array.isArray(arry) || typeof isWatch !== 'boolean') {
    return console.error(
      '[vuex-along] params of watch has error'
    )
  }
  if (type === LOCALSTORAGE) {
    // eslint-disable-next-line no-unused-expressions
    isWatch ? (ll = arry, unll = null) : (unll = arry, ll = null)
  } else {
    // eslint-disable-next-line no-unused-expressions
    isWatch ? (sl = arry, unsl = null) : (unsl = arry, sl = null)
  }
}

const watch = (arry, isWatch) => {
  setWatch(arry, isWatch, LOCALSTORAGE)
}

const watchSession = (arry, isWatch) => {
  setWatch(arry, isWatch, SESSIONSTORAGE)
}

const setOnlySession = bool => {
  if (typeof bool !== 'boolean') {
    return console.error(
      '[vuex-along] params of onlySession has error'
    )
  }
  onlySession = bool
}
const coded = str => {
  // return window.btoa(window.encodeURIComponent(str))
  return str
}
const encoded = str => {
  // return window.decodeURIComponent(window.atob(str))
  return str
}

const getItem = (key, type) => {
  let storage = type === LOCALSTORAGE ? ls : ss
  try {
    return JSON.parse(encoded(storage.getItem(key)))
  } catch (err) {
    return null
  }
}

const setItem = (key, val, type) => {
  let storage = type === LOCALSTORAGE ? ls : ss
  storage.setItem(key, coded(JSON.stringify(val)))
}

const removeItem = (key = KEY) => {
  ss.removeItem(key)
  ls.removeItem(key)
}

/**
 * 2018年8月8日
 * @param key
 */
const setKey = key => {
  if (typeof key === 'string') {
    KEY = key
  } else {
    console.error(
      '[vuex-along] key is not string'
    )
  }
}

vuexAlong.setKey = setKey
vuexAlong.watch = watch
vuexAlong.watchSession = watchSession
vuexAlong.onlySession = setOnlySession
vuexAlong.clean = removeItem
window.cleanVuexAlong = removeItem
