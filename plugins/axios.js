// use
// $axios.$post('personalized', { limit: 6 }) // 区别在于$post返回response.data, 而post返回整个response
// $axios.post('personalized', { limit: 6 })
// $axios.$get('personalized', { params: { limit: 6 } })
// $axios.get('personalized', { params: { limit: 6 } })
// 项目对$axios.onResponse进行处理， 所以统一使用$axios.post调用方便管理
import qs from 'qs'
import { merge } from 'lodash'
import { Cookie } from '@/utils/storage'
let contentTypes = {
  '0': 'application/x-www-form-urlencoded', // chrome Form Data
  '1': 'application/json' // chrome Request Payload
}
let defaultConfigParams = {
  sendToken: false,
  type: 'post',
  contentType: '0'
}
function dealParams (params) {
  let obj = {
  }
  if (params.sendToken) {
    // 默认传token
    obj.opsId = Cookie.get('token') || ''
  }
  return obj
}

export function mergeParams (data, config = {}) {
  let defaultConfigParams = {
  }
  let mergeConfigParams = { ...defaultConfigParams, ...config }
  // 此处做统一参数处理
  let mergeParams = merge(
    dealParams(mergeConfigParams),
    data || {}
  )
  if (mergeConfigParams.type === 'post' && mergeConfigParams.contentType === '0') {
    return qs.stringify(mergeParams)
  }
  return mergeParams
}

// 前端以 '/api/**'作为接口请求
function url (url, config = {}) {
  let defaultConfigParams = {
    dir: 'api',
    domain: '/'
  }
  let mergeConfigParams = { ...defaultConfigParams, ...config }
  return mergeConfigParams.domain + mergeConfigParams.dir + url
}

export default function ({ $axios, redirect }) {
  let mergeConfigParams = { ...defaultConfigParams }
  $axios.defaults.timeout = 8000
  $axios.defaults.baseURL = 'http://localhost:8085'
  $axios.defaults.headers.post['Content-Type'] = contentTypes[mergeConfigParams.contentType]
  $axios.onRequest((config) => {
    config.url = url(config.url)
    return config
  })
  $axios.onRequestError((error) => {
    return Promise.reject(error)
  })
  $axios.onResponse((response) => {
    const res = response.data
    if (res.code !== 200) {
      if (res.code === '2202') { // 登录超时、token失效
      }
      process.env.NODE_ENV !== 'production' && console.error(res)
      return Promise.reject(res)
    }
    return Promise.resolve(res)
  })
  $axios.onResponseError((error) => {
    // error与自定义错误object返回新object
    let errorMerge = (defineObj) => {
      return Object.assign({}, error, {
        error: defineObj
      })
    }
    let obj = {}
    if (error.code === 'ECONNABORTED') {
      // timeout
      obj = errorMerge({ code: 'timeout', message: '请求超时' })
    } else if (typeof error.response === 'undefined') {
      // No 'Access-Control-Allow-Origin' header
      obj = errorMerge({ code: 'crossError', message: '接口跨域错误' })
    } else {
      // 其他错误
      obj = errorMerge({ code: error.response.status, message: error.response.data.message })
    }
    // process.env.NODE_ENV !== 'production' && console.error(Object.assign({}, obj, error))
    return Promise.reject(Object.assign({}, obj, error))
  })
  $axios.onError((error) => {
    console.error(error)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
