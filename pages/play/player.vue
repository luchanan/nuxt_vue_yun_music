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
            <div :class="`song-img circling ${isPlaying ? '' : 'pause'}`">
              <van-image :src="`${songDetail.al.picUrl}`" class="img" lazy-load />
            </div>
          </div>
          <div class="song-lgour" />
        </div>
      </div>
      <div class="song-action">
        <ul flex="cross:center main:center">
          <li><icon-font icon-class="love" /></li>
          <li><icon-font icon-class="download" /></li>
          <li><icon-font icon-class="effect" /></li>
          <li><icon-font icon-class="comment" /></li>
          <li><icon-font icon-class="more_vertical" /></li>
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
        <div style="width: 60%" class="height playing-cache" />
        <div style="width: 0" class="height playing-process" />
      </div>
      <div class="time endtime">
        <template v-if="player">
          {{ player.timeFormat(player.duration) }}
        </template>
      </div>
    </div>
    <div class="player_control">
      <ul flex="cross:center main:center">
        <li><icon-font class="model" icon-class="loop" /></li>
        <li class="prev">
          <icon-font icon-class="prev" />
        </li>
        <li class="play">
          <icon-font @click.native="playClick" :icon-class="isPlaying ? 'pause' : 'play'" />
        </li>
        <li class="next">
          <icon-font icon-class="next" />
        </li>
        <li><icon-font icon-class="play_list" /></li>
      </ul>
    </div>
    <audio id="player" />
  </div>
</template>

<script>
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
  data () {
    return {
      isPlaying: false,
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
    this.player = new Player(document.getElementById('player'), { url: this.song.url })
    this.play()
  },
  methods: {
    playClick () {
      if (this.player.paused()) {
        this.isPlaying = true
        this.play()
      } else {
        this.isPlaying = false
        this.player.pause()
      }
    },
    play () {
      this.player.play(() => {
        this.isPlaying = true
      }, () => {
        this.isPlaying = false
      })
    }
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
      &.blur {
        filter: blur(26PX);
      }
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
          }
          &.playing-process {
            background: rgba(211, 58, 49, 1);
            &:before {
              content: " ";
              display: inline-block;
              position: absolute;
              right: -6px;
              top: 50%;
              margin-top: -6px;
              width: 12px;
              height: 12px;
              background: rgba(211, 58, 49, 1);
              border-radius: 50%;
              z-index: 2;
            }
            &:after {
              content: " ";
              display: inline-block;
              position: absolute;
              right: -25px;
              top: 50%;
              margin-top: -25px;
              width: 50px;
              height: 50px;
              background: #fff;
              border-radius: 50%;
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
