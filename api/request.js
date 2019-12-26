import qs from 'qs'
import { merge } from 'lodash'
import urlName from './urlName'
import axios from '~/utils/axios'
import { Cookie } from '@/utils/storage'

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
export function url (url, config = {}) {
  let defaultConfigParams = {
    dir: 'api',
    domain: '/'
  }
  let mergeConfigParams = { ...defaultConfigParams, ...config }
  return `${mergeConfigParams.domain}${mergeConfigParams.dir}${url}`
}
// api调用
export function excute (name, data, config = {}) {
  let contentTypes = {
    '0': 'application/x-www-form-urlencoded', // chrome Form Data
    '1': 'application/json' // chrome Request Payload
  }
  let defaultConfigParams = {
    sendToken: false,
    type: 'post',
    contentType: '0'
  }
  let mergeConfigParams = { ...defaultConfigParams, ...config }
  let options = {
    url: url(urlName[name], config),
    method: mergeConfigParams.type,
    [mergeConfigParams.type === 'get' ? 'params' : 'data']: mergeParams(data, mergeConfigParams)
  }
  if (mergeConfigParams.type === 'post') {
    let headersObj = Object.create({})
    headersObj['content-type'] = contentTypes[mergeConfigParams.contentType]
    options.headers = headersObj
  }
  return axios(options)
}
