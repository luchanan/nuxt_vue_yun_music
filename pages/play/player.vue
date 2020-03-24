<template>
  <div class="player">
    <van-nav-bar
      @click-left="$router.back()"
      flex="cross:center box:justify"
      class="header reset"
    >
      <template slot="left">
        <div class="left">
          <van-icon name="arrow-left" />
        </div>
      </template>
      <div slot="title" class="title">
        <div class="name">
          {{ songDetail.name }}
        </div>
        <div class="auth">
          {{ (songDetail.ar.map(item => item.name)).join('/') }}
        </div>
      </div>
      <template slot="right">
        <div class="right">
          <icon-font icon-class="share" />
        </div>
      </template>
    </van-nav-bar>
    <div v-lazy:background-image="`//music.163.com/api/img/blur/${songDetail.al.pic_str}`" class="bg" />
    <div class="song-wrap">
      <div class="song-disc">
        <div class="song-turn">
          <div class="song-rollwrap">
            <div class="song-img circling">
              <van-image :src="`${songDetail.al.picUrl}`" class="img" lazy-load />
            </div>
          </div>
          <div class="song-lgour" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  page: {
    footer: false
  },
  head () {
    return {
      title: `${this.songDetail.name} ${this.songDetail.alia.length > 0 ? '（' + this.songDetail.alia.join('/') + '）' : ''} - ${this.songDetail.ar.map(item => item.name).join('/')} - 单曲 - 网易云音乐`
    }
  },
  data () {
    return {
    }
  },
  async asyncData ({ req, res, error, params, $axios, query }) {
    let { songs: [songDetail] } = await $axios.post(`songDetail?timeStamp=${+new Date()}`, { ids: query.ids })
    let { album } = await $axios.post(`getAlbum?id=${+new Date()}`, { id: query.aid })
    return {
      songDetail,
      album
    }
  },
  methods: {
  }
}
</script>

<style lang="less">
  @keyframes circling {
    0% {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(1turn)
    }
  }
  .player {
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    .bg {
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      background-color: #161824;
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: auto 100%;
      transform: scale(1.5);
      transform-origin: center top;
      transition: opacity .3s linear;
      overflow: hidden;
      opacity: 0.5;
      &[lazy="loaded"] {
        opacity: 1;
      }
      &:before {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background-color: rgba(0,0,0,.5);
      }
    }
    .header {
      background: transparent;
    }
    .van-nav-bar__title {
      text-align: left;
    }
    .song-wrap {
      padding: 243px 0 0 0;
      position: relative;
      &:after {
        content: " ";
        position: absolute;
        width: 330px;
        height: 471px;
        top: 0;
        left: 50%;
        margin-left: -44px;
        background-image: url('~@/assets/images/player/needle-plus.png');
        background-size: contain;
        z-index: 2;
      }
      .song-disc {
        margin: 0 auto;
        width: 1026px;
        height: 1026px;
        position: relative;
      }
      .song-rollwrap {
        width: 636px;
        height: 636px;
        margin: -318px 0 0 -318px;
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 1;
        .song-img {
          background: url('~@/assets/images/player/disc_default.png');
          background-size: contain;
          border-radius: 50%;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .circling {
          animation: circling 20s linear infinite;
        }
        .circling.pause {
          animation-play-state: paused;
        }
      }
      .song-lgour {
        &::before {
          content: " ";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background: url('~@/assets/images/player/disc_light-plus.png');
          background-size: contain;
        }
      }
      .song-turn {
        width: 100%;
        height: 100%;
        &::before {
          content: " ";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          z-index: 2;
          background: url('~@/assets/images/player/disc-plus.png');
          background-size: contain;
        }
      }
    }
  }
</style>
