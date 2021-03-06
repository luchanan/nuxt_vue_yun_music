export default class Player {
  constructor (element, params) {
    // params： { url }
    this.element = element
    this.params = params
    this.isPlaying = false
    this.isLoading = false
    this.duration = 0
    this.currentTime = 0
    this.timer = null
    this.bufferInterval = null
    this.bufferPer = 0
    this.endedCb = null
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
    this.element.addEventListener('loadstart', () => {
      console.log('开始请求')
      this.isLoading = true
    })
    this.element.addEventListener('error', () => {
      console.log('请求失败')
    })
    this.element.addEventListener('stalled', () => {
      console.log('网络失速')
    })
    this.element.addEventListener('waiting', () => {
      console.log('等待数据')
      this.isLoading = true
    })
    this.element.addEventListener('canplaythrough', () => {
      console.log('载入完成')
    })
    this.element.addEventListener('play', () => {
      console.log('播放')
    })
    this.element.addEventListener('pause', () => {
      console.log('暂停')
    })
    this.element.addEventListener('canplay', () => {
      // 音频总时长, or监听loadedmetadata事件
      this.duration = this.element.duration
    })
    this.element.addEventListener('ended', () => {
      // 播放结束, 单曲循环不会走这里
      window.clearInterval(this.timer)
      this.resetPlay()
      if (this.params.endedCb) {
        this.params.endedCb()
      }
    })
    this.element.addEventListener('progress', () => {
      let bufferedEnd = this.element.buffered.end(this.element.buffered.length - 1)
      console.log(`当前缓存进度：${bufferedEnd}（秒）`)
      let duration = this.element.duration
      if (duration > 0) {
        document.querySelector('.play_process .playing-cache').style.width = ((bufferedEnd / duration) * 100) + '%'
      }
    })
    this.element.addEventListener('timeupdate', () => {
      let now = this.element.currentTime / this.duration * 100
      this.currentTime = this.element.currentTime // 当前播放时长
      document.querySelector('.play_process .playing-process').style.width = `${now}%`
    })
  }
  setBufferProcess () {
    let bufferedEnd = this.element.buffered.end(this.element.buffered.length - 1)
    let duration = this.element.duration
    if (duration > 0) {
      document.querySelector('.play_process .playing-cache').style.width = ((bufferedEnd / duration) * 100) + '%'
    }
  }
  changPlay (url) {
    this.resetPlay({ clearCache: 1 })
    this.element.src = url
    this.play()
  }
  resetPlay (params = {}) {
    // 重置开始播放值
    this.isPlaying = false
    if (params.clearCache && params.clearCache === 1) {
      clearInterval(this.bufferInterval)
      this.bufferPer = 0
      document.querySelector('.play_process .playing-cache').style.width = `0%`
    }
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
  clearPlayProcess () {
    window.clearInterval(this.timer)
  }
  playProcess () {
    // 播放进度样式控制
    // window.clearInterval(this.timer)
    // this.timer = setInterval(() => {
    //   let now = this.element.currentTime / this.duration * 100
    //   this.currentTime = this.element.currentTime // 当前播放时长
    //   document.querySelector('.play_process .playing-process').style.width = `${now}%`
    // }, 1000)
  }
  setPlayCurrentTime (progress, type = 0) {
    if (this.duration) {
      let second = this.duration * progress / 100
      if (type === 0) {
        this.currentTime = this.element.currentTime = second
      } else if (type === 1) {
        this.currentTime = second
      }
    }
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
        // this.getBufferPer()
        this.playProcess()
      } else if (error) { error() }
    })
  }
  random (min = 0, max) {
    // 随机播放
    let range = max - min
    let random = Math.random()
    return min + Math.round(range * random)
  }
  nextPrevCommon (type) {
    let currentId = window.$nuxt.$store.state.player.currentPlayId
    let playlist = window.$nuxt.$store.state.player.playList
    let currentIdIndex = playlist.findIndex(items => items.id === currentId)
    if (this.playModel !== 'random' && currentIdIndex > -1) {
      if (type === 0) {
        return currentIdIndex - 1 < 0 ? playlist[playlist.length - 1].id : playlist[currentIdIndex - 1].id
      } else if (type === 1) {
        return currentIdIndex + 1 >= playlist.length ? playlist[0].id : playlist[currentIdIndex + 1].id
      }
    } else {
      return playlist[this.random(0, playlist.length - 1)].id
    }
  }
  prev () {
    // 上一首
    return this.nextPrevCommon(0)
  }
  next () {
    // 下一首
    return this.nextPrevCommon(1)
  }
}
