export default class Player {
  constructor (element, params) {
    // params： { url }
    this.element = element
    this.params = params
    this.isPlaying = false
    this.duration = 0
    this.currentTime = 0
    this.timer = null
    this.bufferInterval = null
    this.bufferPer = 0
    this.playModelList = [
      { name: 'loop', desc: '列表循环' },
      { name: 'once', desc: '单曲循环' },
      { name: 'random', desc: '随机播放' }
    ]
    this.playModel = 'loop'
    this.init()
  }
  init () {
    this.element.src = this.params.url
    this.element.addEventListener('canplay', () => {
      // 音频总时长, or监听loadedmetadata事件
      this.duration = this.element.duration
    })
    this.element.addEventListener('ended', () => {
      // 播放结束
      window.clearInterval(this.timer)
      this.resetPlay()
    })
  }
  resetPlay () {
    // 重置开始播放值
    this.isPlaying = false
    this.currentTime = 0
    document.querySelector('.play_process .playing-process').style.width = `0%`
  }
  changeModel () {
    let index = this.playModelList.findIndex(items => items.name === this.playModel)
    if (index > -1) {
      let next = index + 1 >= this.playModelList.length ? 0 : index + 1
      this.playModel = this.playModelList[next].name
      return this.playModelList[next]
    }
  }
  destroy () {
    window.clearInterval(this.timer)
    window.clearInterval(this.bufferInterval)
  }
  getBufferPer () {
    // 假缓冲
    if (this.bufferPer >= 100 || this.bufferPer > 0) { return }
    if (this.duration === 0) { return } // 音频时长
    let count = 20 // 把总时间数分为N份加载
    let each = Math.ceil(this.duration / count)
    let eachPer = Math.round(each / this.duration * 100) // 1份占的百分比
    let stime = 0
    this.bufferInterval = setInterval(() => {
      stime++
      let per = eachPer * stime
      this.bufferPer = per
      document.querySelector('.play_process .playing-cache').style.width = `${per >= 100 ? 100 : per}%`
      if (per >= 100) {
        clearInterval(this.bufferInterval)
      }
    }, 1000)
  }
  timeFormat (number) {
    if (isNaN(number)) { return '' }
    let minute = parseInt(number / 60)
    let second = parseInt(number % 60)
    minute = minute >= 10 ? minute : '0' + minute
    second = second >= 10 ? second : '0' + second
    return minute + ':' + second
  }
  playProcess () {
    // 播放进度样式控制
    window.clearInterval(this.timer)
    this.timer = setInterval(() => {
      let now = this.element.currentTime / this.duration * 100
      this.currentTime = this.element.currentTime // 当前播放时长
      document.querySelector('.play_process .playing-process').style.width = `${now}%`
    }, 1000)
  }
  canAutoPlay () {
    // 测试是否能自动播放
    return new Promise((resolve) => {
      let autoPlay = false
      this.element.play().then(() => {
        autoPlay = true
      }).catch((res) => {
        autoPlay = false
      }).finally(() => {
        resolve(autoPlay)
      })
    })
  }
  paused () {
    // 是否暂停
    return this.element.paused
  }
  pause () {
    // 暂停播放
    this.isPlaying = false
    this.element.pause()
  }
  play (success, error) {
    // 播放音乐
    this.canAutoPlay().then((res) => {
      if (res) {
        if (success) { success() }
        this.isPlaying = true
        this.element.play()
        this.getBufferPer()
        this.playProcess()
      } else if (error) { error() }
    })
  }
}
