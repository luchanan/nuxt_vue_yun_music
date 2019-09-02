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
