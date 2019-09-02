import Vue from 'vue'
export function formatPlayNum (m, t) {
  // 原始
  // let n = arguments.length > 1 && void 0 !== t && t
  // let r = e
  // typeof r !== 'number' && (r = parseFloat(r, 10) || 0)
  // let o = n ? 'round' : 'floor'
  // if (r >= 1e8) { return Math[o](e / 1e7) / 10 + '亿' }
  // if (r >= 1e5) {
  //   let i = Math[o](e / 1e3) / 10
  //   return i >= 1e4 ? '1亿' : i + '万'
  // }
  // return r
  let to = arguments.length > 1 && undefined !== t && t
  let width = m
  if (typeof width !== 'number') {
    width = parseFloat(width, 10) || 0
  }
  let mathMethod = to ? 'round' : 'floor'
  if (width >= 100000000) {
    return Math[mathMethod](m / 10000000) / 10 + '亿'
  }
  if (width >= 100000) {
    let i = Math[mathMethod](m / 1000) / 10
    return i >= 10000 ? '1亿' : i + '万'
  }
  return width
}
const filters = {
  formatPlayNum
}
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
export default filters
