<template>
  <div class="playlist_detail">
    <section class="top" flex="cross:center main:justify dir:top">
      <div class="bg" :style="{backgroundImage:`url(${playlist.coverImgUrl}?param=170y170)`}" />
      <div flex="cross:center box:first" class="summary">
        <div class="img-font-content">
          <div aspectratio>
            <div aspectratio-content>
              <van-image class="img mask mask-top" :src="playlist.coverImgUrl" lazy-load>
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>
              <span class="play-num"><icon-font icon-class="earphone" />{{ playlist.playCount|formatPlayNum }}</span>
            </div>
          </div>
        </div>
        <div class="font">
          <h1>{{ playlist.name }}</h1>
          <div class="creator_info" flex="cross:center">
            <img :src="playlist.creator.avatarUrl">
            <span class="nickname">{{ playlist.creator.nickname }}<icon-font icon-class="arrow-right" /></span>
          </div>
        </div>
      </div>
      <div class="icons" flex="cross:center main:justify">
        <a flex-box="1" href="" class="align-center">
          <div><icon-font icon-class="comment" svg /></div>
          <p>{{ playlist.commentCount }}</p>
        </a>
        <a flex-box="1" href="" class="align-center">
          <div><icon-font icon-class="share" svg /></div>
          <p>{{ playlist.shareCount }}</p>
        </a>
        <a flex-box="1" href="" class="align-center">
          <div><icon-font icon-class="download" svg /></div>
          <p>下载</p>
        </a>
        <a flex-box="1" href="" class="align-center">
          <div><icon-font icon-class="checkbox" svg /></div>
          <p>多选</p>
        </a>
      </div>
    </section>
  </div>
</template>

<script>
// import * as tools from '@/utils/tools'
export default {
  data () {
    return {
    }
  },
  async asyncData ({ req, res, error, params, $axios, query }) {
    let { playlist } = await $axios.post('playlistDetail', { id: query.id })
    console.log(playlist.coverImgUrl)
    return {
      playlist
    }
  }
}
</script>

<style lang="less">
  .playlist_detail {
    .top {
      height: 740px;
      padding: 80px 45px;
      overflow: hidden;
      position: relative;
      .bg {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
        filter: blur(20PX);
        transform: scale(1.5);
        height: 100%;
        &:after {
          content: " ";
          background-color: rgba(0,0,0,.25);
        }
      }
      .bg, .bg:after {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
      }
      .icons {
        width: 100%;
        position: relative;
        z-index: 2;
        margin-top: 50px;
        a {
          display: block;
          color: @font-white-color;
          p {
            font-size: 34px;
            padding-top: 5px;
          }
          .iconfont {
            width: 70px;
            height: 70px;
          }
        }
      }
      .summary {
        width: 100%;
        position: relative;
        z-index: 2;
        .font {
          padding: 45px;
          color: @font-white-color;
          h1 {
            font-size: 54px;
            margin-bottom: 75px;
            .lineClamp()
          }
          .nickname {
            opacity: .9;
            .lineClamp(1);
            .iconfont {
              font-size: 50px;
            }
          }
        }
        .creator_info {
          img {
            width: 94px;
            height: 94px;
            border-radius: 50%;
            margin-right: 20px;
          }
        }
      }
    }
    .img-font-content {
      width: 420px;
      height: 420px;
      padding: 0 !important;
    }

  }
</style>
