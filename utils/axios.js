import axios from 'axios'
const instance = axios.create({
  timeout: 8000,
  baseURL: 'http://localhost:8085'
})

instance.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 200) {
      if (res.code === '2202') { // 登录超时、token失效
      }
      process.env.NODE_ENV !== 'production' && console.error(res)
      return Promise.reject(res)
    }
    return Promise.resolve(res)
  },
  (error) => {
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
  }
)

export default instance
