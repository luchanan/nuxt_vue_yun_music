<template>
  <div class="player">
    <van-nav-bar
      flex="cross:center box:justify"
      class="header reset"
      left-arrow
    >
      <div slot="title">
        <div class="name">
          {{ songDetail.name }}
        </div>
        <div class="auth">
          {{ (songDetail.ar.map(item => item.name)).join('/') }}
        </div>
      </div>
      <van-icon slot="right" name="search" />
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  page: {
    footer: false
  },
  data () {
    return {
    }
  },
  async asyncData ({ req, res, error, params, $axios, query }) {
    let { songs: [songDetail] } = await $axios.post(`songDetail?timeStamp=${+new Date()}`, { ids: query.ids })
    // let aaa = await $axios.post(`getAlbum?id=${+new Date()}`, { id: query.aid })
    return {
      songDetail
    }
  }
}
</script>

<style lang="less">
  .player {
    min-height: 100vh;
    .van-nav-bar__title {
      text-align: left;
    }
  }
</style>
