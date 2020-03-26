export default class Player {
  constructor (element, params) {
    // { url }
    this.element = element
    this.params = params
    this.duration = 0
    this.currentTime = 0
    this.timer = null
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
    })
    // this.element.addEventListener('timeupdate', () => {
    //   // timeupdate在当前播放位置改变时执行, 获取音频缓冲进度样式
    //   if (this.element.readyState === 4) {
    //     console.log(this.element.buffered.end(this.element.buffered.length - 1))
    //     let bufferPer = Math.round(this.element.buffered.end(this.element.buffered.length - 1) / this.duration * 100) + '%'
    //     document.querySelector('.play_process .playing-cache').style.width = bufferPer
    //   }
    // })
    this.element.addEventListener('suspend', () => {
      // 获取音频缓冲进度样式
      let timeRange = this.element.buffered
      if (timeRange.length > 0 && this.element.duration > 0) {
        let bufferPer = Math.round(this.element.buffered.end(0) / this.duration * 100) + '%'
        document.querySelector('.play_process .playing-cache').style.width = bufferPer
      }
    })
  }
  getBufferPer () {
    // 不用
    // 与timeupdate数据差别不大， 暂停this.element.buffered.end(0)会不变
    let bufferInterval = setInterval(() => {
      if (this.element.readyState === 4) {
        let bufferPer = Math.round(this.element.buffered.end(0) / this.duration * 100) + '%'
        document.querySelector('.play_process .playing-cache').style.width = bufferPer
        if (this.element.buffered.end(0) === this.element.duration) {
          clearInterval(bufferInterval)
        }
      }
    }, 100)
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
      let now = Math.round(this.element.currentTime / this.duration * 100)
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
    this.element.pause()
  }
  play (success, error) {
    // 播放音乐
    this.canAutoPlay().then((res) => {
      if (res) {
        if (success) { success() }
        this.element.play()
        this.playProcess()
      } else if (error) { error() }
    })
  }
}
