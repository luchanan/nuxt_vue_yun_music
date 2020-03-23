// use
// $axios.$post('personalized', { limit: 6 }) // 区别在于$post返回response.data, 而post返回整个response
// $axios.post('personalized', { limit: 6 })
// $axios.$get('personalized', { params: { limit: 6 } })
// $axios.get('personalized', { params: { limit: 6 } })
// 项目对$axios.onResponse进行处理， 所以统一使用$axios.post调用方便管理
import urlName from '@/api/urlName'
import qs from 'qs'
// import { merge } from 'lodash'
// import { Cookie } from '@/utils/storage'
let contentTypes = {
  '0': 'application/x-www-form-urlencoded', // chrome Form Data
  '1': 'application/json' // chrome Request Payload
}
let defaultConfigParams = {
  contentType: '0'
}

// 前端以 '/api/**'作为接口请求
function url (url, config = {}) {
  let defaultConfigParams = {
    dir: 'api',
    domain: '/'
  }
  let transferUrl = urlName[url]
  if (url && url.includes('?')) {
    let index = url.indexOf('?')
    transferUrl = urlName[url.substring(0, index)] + url.substring(index)
  }
  let mergeConfigParams = { ...defaultConfigParams, ...config }
  return mergeConfigParams.domain + mergeConfigParams.dir + transferUrl
}

export default function ({ $axios, redirect }) {
  let mergeConfigParams = { ...defaultConfigParams }
  $axios.defaults.timeout = 8000
  $axios.defaults.baseURL = 'http://localhost:8085'
  $axios.setHeader('Content-Type', contentTypes[mergeConfigParams.contentType], ['post'])
  // $axios.defaults.headers.post['Content-Type'] = contentTypes[mergeConfigParams.contentType]
  $axios.onRequest((config) => {
    if (config.method === 'post' && mergeConfigParams.contentType === '0') {
      config.data = qs.stringify(config.data)
    }
    config.url = url(config.url)
    return config
  })
  $axios.onRequestError((error) => {
    return Promise.reject(error)
  })
  $axios.onResponse((response) => {
    // 接口返回的response.data.code === 200才会走这里
    const res = response.data
    return Promise.resolve(res)
  })
  $axios.onResponseError((error) => {
    // 接口返回的response.data.code !== 200会走这里
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
      obj = errorMerge({ code: error.response.status, message: error.response.data.message || '未知错误' })
    }
    // process.env.NODE_ENV !== 'production' && console.error(Object.assign({}, obj, error))
    return Promise.reject(Object.assign({}, obj, error))
  })
  // $axios.onError((error) => {
  //   console.error(error, 'onError')
  // })
}
