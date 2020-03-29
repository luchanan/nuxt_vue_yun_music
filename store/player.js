export const state = () => ({
  id: '', // 歌单id
  currentPlayId: '', // 当前播放id
  playList: []
})
export const mutations = {
  updateId (state, id) {
    state.id = id
  },
  updateList (state, list) {
    state.playList = list
  },
  updateCurrentPlayId (state, id) {
    state.currentPlayId = id
  }
}
