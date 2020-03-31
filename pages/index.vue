<template>
  <div>
    <div id="banner">
      <div class="banner-warpper">
        <van-swipe indicator-color="#fa5143">
          <van-swipe-item v-for="(row, index) in banners" :key="index">
            <div class="inner">
              <img v-lazy="`${row.imageUrl}`">
              <span :class="`type ${row.titleColor}`">{{ row.typeTitle }}</span>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <nav id="nav" class="van-hairline--bottom" flex="main:center cross:center box:mean">
      <nuxt-link v-for="(row, index) in navData" :key="index" to="/" class="align-center">
        <div class="icon-warpper">
          <icon-font :icon-class="row.icon" svg />
          <span v-if="row.icon == 'date'" class="day">{{ new Date().getDate() }}</span>
        </div>
        <div class="title">
          {{ row.name }}
        </div>
      </nuxt-link>
    </nav>
    <ul>
      <li class="items">
        <div class="img-font-title">
          推荐歌曲<icon-font icon-class="arrow-right" svg />
        </div>
        <van-grid :border="false" :column-num="3" class="img-font-content">
          <van-grid-item v-for="(row, index) in recomment" :key="index" @click="$router.push({path: 'play/detail', query: {id: row.id}})" class="img-font-items">
            <div aspectratio>
              <div aspectratio-content>
                <van-image :src="`${row.picUrl}?param=394y394`" class="img mask mask-top" lazy-load>
                  <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                  </template>
                </van-image>
                <span class="play-num"><icon-font icon-class="earphone" />{{ row.playCount|formatPlayNum }}</span>
              </div>
            </div>
            <div class="name">
              {{ row.name }}
            </div>
          </van-grid-item>
        </van-grid>
      </li>
      <li class="items">
        <div class="img-font-title">
          最新音乐<icon-font icon-class="arrow-right" svg />
        </div>
        <van-grid :border="false" :column-num="3" class="img-font-content">
          <van-grid-item v-for="(row, index) in newsong" :key="index" class="img-font-items">
            <div aspectratio>
              <div aspectratio-content>
                <van-image :src="`${row.song.album.picUrl}?param=394y394`" class="img" lazy-load>
                  <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                  </template>
                </van-image>
              </div>
            </div>
            <div class="name">
              {{ row.name }}
            </div>
            <div class="auth-name">
              {{ row.song.artists[0].name }}
            </div>
          </van-grid-item>
        </van-grid>
      </li>
      <li class="items">
        <div class="img-font-title">
          主播电台<icon-font icon-class="arrow-right" svg />
        </div>
        <van-grid :border="false" :column-num="3" class="img-font-content">
          <van-grid-item v-for="(row, index) in djprogram" :key="index" class="img-font-items">
            <div aspectratio>
              <div aspectratio-content>
                <van-image :src="`${row.picUrl}?param=394y394`" class="img mask mask-bottom" lazy-load>
                  <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                  </template>
                </van-image>
                <span class="bottom-text">{{ row.name }}</span>
              </div>
            </div>
            <div class="name">
              {{ row.rcmdtext }}
            </div>
          </van-grid-item>
        </van-grid>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData ({ req, res, error, params, $axios }) {
    // https://zh.nuxtjs.org/guide/async-data/#asyncdata-%E6%96%B9%E6%B3%95
    try {
      let { banners } = await $axios.post('banner')
      let recomment = await $axios.post('recommendsong', { limit: 6 })
      let newsong = await $axios.post('newsong')
      let djprogram = await $axios.post('djhot', { limit: 6 })
      return {
        banners,
        recomment: recomment.result,
        newsong: newsong.result.slice(0, 6),
        djprogram: djprogram.djRadios,
        // 静态数据
        navData: [
          { name: '私人FM', icon: 'radio' },
          { name: '每日推荐', icon: 'date' },
          { name: '歌单', icon: 'music' },
          { name: '排行榜', icon: 'sort' }
        ]
      }
    } catch (res) {
      error({ statusCode: params.statusCode, message: 'Post not found' })
    }
  }
}
</script>

<style lang="less">
  @pading-left: 18px;
  @border-radius-img: 18px;
  #banner {
    height: 468px;
    background-color: @font-red-color;
    background-clip: content-box;
    padding: 0 0 105px 0;
    .van-swipe-item {
      font-size: 0;
    }
    .inner {
      padding: 0 18px;
    }
    .banner-warpper {
      img {
        border-radius: @border-radius-img;
      }
      .type {
        border-radius: @border-radius-img  0;
        color: @font-white-color;
        position:absolute;
        right: 18px;
        bottom: 0;
        font-size: 36px;
        padding: 10px 32px;
        display: inline-block;
        &.blue {
          background: #69bbe8;
        }
        &.red {
          background: @font-red-color;
        }
      }
    }
  }
  #nav {
    padding: 50px 0;
    .icon-warpper {
      width: 170px;
      height: 170px;
      border-radius: 50%;
      background: @font-red-color;
      display: inline-block;
      position: relative;
      .day {
        color: @font-white-color;
        font-size: 36px;
        margin-top: 72px;
        display: inline-block;
      }
    }
    .iconfont {
      color: @font-white-color;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 82px;
      height: 82px;
    }
    a, .title {
      font-size: 38px;
      color: @font-primary-color;
    }
    .title {
      margin-top: 20px;
    }
  }
  .img-font-title {
    font-size: 50px;
    padding: 60px 0 0 @pading-left;
    vertical-align: middle;
  }
</style>
