<template>
  <div class="player">
    <van-nav-bar
      @click-left="back"
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
          <van-notice-bar :text="songDetail.name" class="scroll_txt" color="#fff" background="transparent" />
        </div>
        <div class="auth">
          <span>{{ (songDetail.ar.map(item => item.name)).join('/') }}</span> <van-icon name="arrow" />
        </div>
      </div>
      <template slot="right">
        <div class="right">
          <icon-font icon-class="share" />
        </div>
      </template>
    </van-nav-bar>
    <div v-lazy:background-image="`//music.163.com/api/img/blur/${songDetail.al.pic_str ? songDetail.al.pic_str : songDetail.al.pic}`" class="bg" />
    <div :class="{'song-wrap': true, 'rotating': player && !player.isPlaying}">
      <div class="song-disc">
        <van-swipe :show-indicators="false" class="song-disc-swiper">
          <van-swipe-item>
            <div class="song-turn">
              <div class="song-rollwrap">
                <div :class="`song-img circling ${player && player.isPlaying ? '' : 'pause'}`">
                  <!-- <van-image :src="`${songDetail.al.picUrl}`" class="img" lazy-load /> -->
                </div>
              </div>
              <div class="song-lgour">
                <div :class="`song-light circling ${player && player.isPlaying ? '' : 'pause'}`" />
              </div>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="song-turn">
              <div class="song-rollwrap">
                <div :class="`song-img circling ${player && player.isPlaying ? '' : 'pause'}`">
                  <van-image :src="`${songDetail.al.picUrl}`" class="img" lazy-load />
                </div>
              </div>
              <div class="song-lgour">
                <div :class="`song-light circling ${player && player.isPlaying ? '' : 'pause'}`" />
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
        <div class="circle" />
      </div>
      <div class="song-action">
        <ul flex="cross:center main:center">
          <li><icon-font icon-class="love" /></li>
          <li><icon-font icon-class="download" /></li>
          <li><icon-font icon-class="effect" /></li>
          <li><icon-font icon-class="comment" /></li>
          <li><icon-font @click.native="showMorePopup" icon-class="more_vertical" /></li>
        </ul>
      </div>
    </div>
    <div class="play_process" flex="cross:center main:justify">
      <div class="time starttime">
        <template v-if="player">
          {{ player.timeFormat(player.currentTime) }}
        </template>
      </div>
      <div class="process">
        <div class="height playing-default" />
        <div style="width: 0" class="height playing-cache" />
        <div style="width: 0" class="height playing-process">
          <div
            @touchstart="rangeTouchStart"
            @touchmove="rangeTouchMove"
            @touchend="rangeTouchEnd"
            class="circle"
          >
            <div class="red" />
          </div>
        </div>
      </div>
      <div class="time endtime">
        <template v-if="player">
          {{ player.timeFormat(player.duration) }}
        </template>
      </div>
    </div>
    <div class="player_control">
      <audio id="player" :loop="player ? player.playModel == 'once' ? true: false : false" preload />
      <ul flex="cross:center main:center">
        <li><icon-font :icon-class="player ? player.playModel : 'loop'" @click.native="modelClick" class="model" /></li>
        <li class="prev">
          <icon-font @click.native="prev" icon-class="prev" />
        </li>
        <li class="play">
          <icon-font :icon-class="player && player.isPlaying ? 'pause' : 'play'" @click.native="playClick" />
        </li>
        <li class="next">
          <icon-font @click.native="next" icon-class="next" />
        </li>
        <li><icon-font @click.native="showPopupList" icon-class="play_list" /></li>
      </ul>
    </div>
    <popupList ref="popupList" @clickPlay="clickPlay" />
    <morePopup ref="morePopup" />
  </div>
</template>

<script>
import popupList from './popupPlayList'
import morePopup from './morePopup'
import Player from './player.js'
export default {
  page: {
    footer: false
  },
  head () {
    return {
      title: `${this.songDetail.name} ${this.songDetail.alia.length > 0 ? '（' + this.songDetail.alia.join('/') + '）' : ''} - ${this.songDetail.ar.map(item => item.name).join('/')} - 单曲 - 网易云音乐`
    }
  },
  components: { popupList, morePopup },
  data () {
    return {
      player: null
    }
  },
  async asyncData ({ req, res, error, params, $axios, query }) {
    let { songs: [songDetail] } = await $axios.post(`songDetail?timeStamp=${+new Date()}`, { ids: query.ids })
    let { data: [song] } = await $axios.post(`getSongUrl?id=${+new Date()}`, { id: songDetail.id })
    return {
      songDetail,
      song
    }
  },
  mounted () {
    this.player = new Player(document.getElementById('player'), { url: this.song.url, endedCb: this.next })
    this.play()
    if (this.$store.state.player.playList.length === 0) {
      this.$store.commit('player/updateCurrentPlayId', this.songDetail.id)
      this.$store.commit('player/updateList', [this.songDetail])
    }
  },
  methods: {
    rangeTouchStart (e) {
      this.touching = true
      this.startPageX = e.touches[0].pageX
      this.startOffsetLeft = e.target.offsetLeft
    },
    rangeTouchMove (e) {
      this.player.clearPlayProcess()
      let barWidth = document.querySelector('.process').offsetWidth
      this.movePageX = e.touches[0].pageX
      let moveDisctance = Math.min(barWidth, Math.max(0, this.startOffsetLeft + (this.movePageX - this.startPageX)))
      this.dataProgress = Math.floor(moveDisctance / barWidth * 100)
      document.querySelector('.play_process .playing-process').style.width = `${this.dataProgress}%`
      this.player.setPlayCurrentTime(this.dataProgress, 1)
    },
    rangeTouchEnd (e) {
      this.touching = false
      this.player.setPlayCurrentTime(this.dataProgress)
      this.player.playProcess()
    },
    async getSongUrl (id) {
      try {
        let { songs: [songDetail] } = await this.$axios.post(`songDetail?timeStamp=${+new Date()}`, { ids: id })
        this.$store.commit('player/updateCurrentPlayId', songDetail.id)
        let { data: [song] } = await this.$axios.post(`getSongUrl?id=${+new Date()}`, { id: songDetail.id })
        this.songDetail = songDetail
        this.song = song
        return song.url
      } catch (res) {
        return ''
      }
    },
    async clickPlay (id) {
      await this.getSongUrl(id)
      this.player.changPlay(this.song.url)
    },
    async next () {
      await this.getSongUrl(this.player.next())
      this.player.changPlay(this.song.url)
    },
    async prev () {
      await this.getSongUrl(this.player.prev())
      this.player.changPlay(this.song.url)
    },
    showPopupList () {
      this.$refs.popupList.show()
    },
    showMorePopup () {
      this.$refs.morePopup.show()
    },
    modelClick () {
      let obj = this.player.changeModel()
      this.$toast(obj.desc)
    },
    back () {
      this.player.destroy()
      this.$router.back()
    },
    playClick () {
      if (this.player.paused()) {
        this.play()
      } else {
        this.player.pause()
      }
    },
    play () {
      this.player.play()
    }
  }
}
</script>

<style lang="less">
  @cover-padding: 110px;
  @keyframes circling {
    0% {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(1turn)
    }
  }
  .player {
    .circling {
      animation: circling 20s linear infinite;
    }
    .circling.pause {
      animation-play-state: paused;
    }
    .scroll_txt {
      height: auto;
      padding: 0;
      line-height: inherit;
      font-size: 48px;
      [role="marquee"] {
        height: 58px;
      }
    }
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    .blur, .bg {
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
    }
    .blur {
      filter: blur(20PX);
      transform: scale(1.5);
      .bg {
        transform: scale(1);
      }
    }
    .bg {
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
      overflow: hidden;
      &:after {
        content: " ";
        position: absolute;
        width: 329px;
        height: 521px;
        top: -48px;
        left: 50%;
        margin-left: -44px;
        background-image: url('~@/assets/images/player/needle-plus-circle.png');
        background-size: contain;
        z-index: 2;
        transform-origin: 50px 50px; // 以灰色小圆点为中心旋转
        transition: transform .25s linear;
        transform: rotate(0deg);
      }
      &.rotating:after {
        transform: rotate(-25deg);
      }
      .song-disc {
        width: 100%;
        height: 1026px;
        position: relative;
      }
      .song-disc-swiper {
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      .circle {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        width: 100%;
        height: 100%;
        width: 1020px;
        height: 1020px;
        border: solid 40px rgba(255, 255, 255, 0.1);
        margin: 0 auto;
      }
      .song-rollwrap {
        width: 636px;
        height: 636px;
        margin: -320px 0 0 -318px;
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
      }
      .song-lgour, .song-light {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        padding: 0 @cover-padding;
        z-index: 2;
      }
      .song-light {
        background: url('~@/assets/images/player/disc_light-plus.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-origin: content-box;
      }
      .song-turn {
        padding: 0 @cover-padding;
        width: 100%;
        height: 100%;
        &::before {
          content: " ";
          padding: 0 @cover-padding;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          z-index: 2;
          background: url('~@/assets/images/player/disc-plus-no-border.png');
          background-size: contain;
          background-repeat: no-repeat;
          background-origin: content-box;
        }
      }
    }
    .song-action {
      padding: 230px 52px 89px 52px;
      li {
        padding: 0 78px;
      }
      .iconfont {
        font-size: 70px;
        color: @font-white-color;
      }
    }
    .player_control {
      position: relative;
      padding: 79px 55px 0 55px;
      z-index: 1;
      .iconfont {
        font-size: 70px;
        color: @font-white-color;
      }
      .play {
        padding: 0;
        .iconfont {
          font-size: 140px;
        }
      }
      .prev, .next {
        padding: 0 150px 0 215px;
      }
    }
    .play_process {
      position: relative;
      z-index: 1;
      padding: 0 52px;
      .process {
        position: relative;
        height: 50px;
        width: 100%;
        .height {
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 6px;
          margin-top: -3px;
          background: rgba(255, 255, 255, .2);
          border-radius: 10px;
          &.playing-cache {
            background: rgba(255, 255, 255, .5);
            transition: width 0.2s ease;
          }
          &.playing-process {
            background: rgba(211, 58, 49, 1);
            .circle {
              position: absolute;
              right: -25px;
              top: 50%;
              margin-top: -25px;
              width: 50px;
              height: 50px;
              background: #fff;
              border-radius: 50%;
              .red {
                position: absolute;
                margin-left: -6px;
                left: 50%;
                top: 50%;
                margin-top: -6px;
                width: 12px;
                height: 12px;
                background: rgba(211, 58, 49, 1);
                border-radius: 50%;
              }
            }
          }
        }
      }
      .time {
        font-size: 28px;
        color: @font-white-color;
        &.starttime {
          margin-right: 44px;
        }
        &.endtime {
          margin-left: 44px;
        }
      }
    }
  }
</style>
