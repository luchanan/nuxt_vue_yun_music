import Cookies from 'js-cookie'
import { isNil } from 'lodash'
const ls = process.client ? window.localStorage : {}
const ss = process.client ? window.sessionStorage : {}
function isEmpty (val) {
  if (isNil(val) || val === 'undefined' || val === '') {
    return true
  }
  return false
}
export const Cookie = {
  set (name, val, params = {}, validateEmpty = true) {
    if (validateEmpty && isEmpty(val)) {
      return
    }
    Cookies.set(window._PREFIX + name, JSON.stringify(val), params)
  },
  get (name) {
    return Cookies.get(window._PREFIX + name)
  },
  remove (name, params = {}) {
    Cookies.remove(window._PREFIX + name, params)
  }
}
export const Local = {
  set (name, val) {
    if (isEmpty(val)) {
      return
    }
    ls.setItem(window._PREFIX + name, val)
  },
  get (name) {
    return ls.getItem(window._PREFIX + name)
  },
  remove (name) {
    ls.removeItem(window._PREFIX + name)
  }
}
export const Session = {
  set (name, val) {
    if (isEmpty(val)) {
      return
    }
    ss.setItem(window._PREFIX + name, val)
  },
  get (name) {
    return ss.getItem(window._PREFIX + name)
  },
  remove (name) {
    ss.removeItem(window._PREFIX + name)
  }
}
