// 服务端使用nuxtVCookie， 客户端使用js-cookie
import Cookies from 'js-cookie'
import { isNil } from 'lodash'
const ls = process.client ? window.localStorage : {}
const ss = process.client ? window.sessionStorage : {}
const cookieparser = process.server ? require('cookieparser') : undefined
let prefixName = '__'
let _PREFIX = process.client ? window._PREFIX || prefixName : prefixName
function isEmpty (val) {
  if (isNil(val) || val === 'undefined' || val === '') {
    return true
  }
  return false
}
export const nuxtCookie = {
  get (name, req) {
    if (req && req.headers.cookie) {
      try {
        const parsed = cookieparser.parse(req.headers.cookie)
        return parsed[_PREFIX + name]
      } catch (err) {
        return null
      }
    } else {
      return null
    }
  }
}
export const Cookie = {
  set (name, val, params = {}, validateEmpty = true) {
    if (validateEmpty && isEmpty(val)) {
      return
    }
    Cookies.set(_PREFIX + name, JSON.stringify(val), params)
  },
  get (name, params) {
    if (process.client) {
      return Cookies.get(_PREFIX + name)
    } else {
      return nuxtCookie.get(name, params.req || params)
    }
  },
  remove (name, params = {}) {
    Cookies.remove(_PREFIX + name, params)
  }
}
export const Local = {
  set (name, val) {
    if (isEmpty(val)) {
      return
    }
    ls.setItem(_PREFIX + name, val)
  },
  get (name) {
    return ls.getItem(_PREFIX + name)
  },
  remove (name) {
    ls.removeItem(_PREFIX + name)
  }
}
export const Session = {
  set (name, val) {
    if (isEmpty(val)) {
      return
    }
    ss.setItem(_PREFIX + name, val)
  },
  get (name) {
    return ss.getItem(_PREFIX + name)
  },
  remove (name) {
    ss.removeItem(_PREFIX + name)
  }
}
