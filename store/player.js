// import store from '@/store'
export const state = () => ({
  id: '', // 歌单id
  currentPlayId: '', // 当前播放id
  playList: [], // 播放列表
  swiperPlayList: [] // 轮播播放
})
export const mutations = {
  updateId (state, id) {
    state.id = id
  },
  updatePlayList (state, list) {
    state.playList = list
  },
  updateCurrentPlayId (state, id) {
    state.currentPlayId = id
  },
  UpdateSwiperPlayList (state, list) {
    state.swiperPlayList = list
  }
}
