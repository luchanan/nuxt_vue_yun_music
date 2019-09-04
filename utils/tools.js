import { Toast } from 'vant'
export function toast (type, message, duration, params) {
  let defaultParams = {
    mask: false
  }
  let mergeParems = { ...defaultParams, ...params }
  Toast({
    type,
    message,
    duration: 0,
    mask: mergeParems.mask,
    onClose () {
      params.onClose()
    }
  })
}

export function stringFormat () {
  // string字符串占位符号
  let result = arguments[0]
  if (arguments.length > 0) {
    if (arguments.length === 2 && typeof (arguments[1]) === 'object') {
      for (let key in arguments[1]) {
        if (arguments[1][key] !== undefined) {
          let reg = new RegExp('({' + key + '})', 'g')
          result = result.replace(reg, arguments[1][key])
        }
      }
    } else {
      for (let i = 1; i < arguments.length; i++) {
        if (arguments[i] !== undefined) {
          let reg = new RegExp('({)' + (i - 1) + '(})', 'g')
          result = result.replace(reg, arguments[i])
        }
      }
    }
  }
  return result
}
