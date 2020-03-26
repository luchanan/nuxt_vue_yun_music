<template>
  <div class="playlist_detail">
    <section class="top" flex="cross:center main:justify dir:top">
      <div :style="{backgroundImage:`url(${playlist.coverImgUrl}?param=170y170)`}" class="bg" />
      <div flex="cross:center" class="summary">
        <div class="img-font-content">
          <div aspectratio>
            <div aspectratio-content>
              <van-image :src="playlist.coverImgUrl" class="img mask mask-top" lazy-load>
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
    <div class="play_list">
      <van-cell
        class="header"
        flex="cross:center"
      >
        <template slot="title">
          <div class="title" flex="cross:center">
            <div class="number play">
              <van-icon class="icon" name="play-circle-o" />
            </div>
            <div><span class="name">播放全部</span><span class="songs gray">(共{{ playlist.trackCount }}首)</span></div>
          </div>
        </template>
        <div class="collect">
          <van-icon name="plus" />收藏({{ playlist.subscribedCount }})
        </div>
      </van-cell>
      <van-cell
        v-for="(row, index) in playlist.tracks"
        :key="index"
        class="list"
        flex="cross:center box:last"
        @click="$router.push({path: '/play/player', query: {ids: row.id, aid: row.al.id}})"
      >
        <template slot="title">
          <div class="title" flex="cross:center box:first">
            <div class="number gray">
              {{ index + 1 }}
            </div>
            <div>
              <div class="name">
                {{ row.name }}<span class="gray" />
              </div>
              <div class="memo gray">
                {{ (row.ar.map(item => item.name)).join('/') }} - {{ row.al.name }}
              </div>
            </div>
          </div>
        </template>
        <div>
          <!--音乐图标判断的条件，暂时不知道怎么判断的-->
          <icon-font v-if="row.mv > 0" icon-class="video" class="icons" /><van-icon class="icons" name="ellipsis" />
        </div>
      </van-cell>
    </div>
  </div>
</template>

<script>
// import * as tools from '@/utils/tools'
export default {
  head () {
    return {
      title: `${this.playlist.name} - 歌单 - 网易云音乐`,
      meta: [
        { hid: 'description', name: 'description', content: `${this.playlist.creator.nickname} 创建的歌单《${this.playlist.name}》。简介：${this.playlist.description}` }
      ]
    }
  },
  data () {
    return {
    }
  },
  async asyncData ({ req, res, error, params, $axios, query }) {
    let { playlist } = await $axios.get('playlistDetail', { params: { id: query.id, timeStamp: +new Date() } })
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
          flex: 1;
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
  @padding-top-bottom: 43px;
  @left: 118px;
  .play_list {
    .gray {
      color: #979798;
    }
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    .number {
      width: @left;
      text-align: center;
    }
    .header, .list {
      &::after {
        left: @left;
      }
    }
    .header {
      line-height: normal;
      padding: 0;
      .collect {
        padding: @padding-top-bottom + 4px 30px @padding-top-bottom + 4px 30px;
        font-size: 40px;
        color: #ffffff;
        background-color: @font-red-color;
        display: inline-block;
      }
      .play {
        .icon {
          font-size: 62px;
          vertical-align: middle;
        }
      }
      .title {
        padding: @padding-top-bottom 0 @padding-top-bottom 0;
        .songs {
          font-size: 44px;
        }
      }
    }
    .name {
      font-size: 48px;
    }
    .list {
      line-height: 1.5;
      padding: 19px 30px 19px 0;
      // .van-cell__title {
      // }
      .van-cell__value {
        flex: none;
      }
      .number {
        font-size: 50px;
      }
      .memo {
        font-size: 36px;
      }
      .icons {
        font-size: 60px;
        vertical-align: middle;
        &:last-child {
          margin-left: 62px;
        }
      }
    }
  }
</style>
