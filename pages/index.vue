<template>
  <div class="container">
    <div class="img-font-title">
      推荐歌曲<icon-font icon-class="arrow-right" />
    </div>
    <van-grid class="img-font-content" :gutter="10" :column-num="3">
      <van-grid-item v-for="(row, index) in recomment" :key="index" class="img-font-items">
        <div aspectratio class="recomment-img">
          <div aspectratio-content>
            <img v-lazy="row.picUrl">
          </div>
        </div>
        <div class="name">
          {{ row.name }}
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  async asyncData ({ req, res, error, params, $axios }) {
    // https://zh.nuxtjs.org/guide/async-data/#asyncdata-%E6%96%B9%E6%B3%95
    try {
      let recomment = await $axios.post('personalized', { limit: 6 })
      return {
        recomment: recomment.result
      }
    } catch (res) {
      error({ statusCode: params.statusCode, message: 'Post not found' })
    }
  }
}
</script>

<style lang="less">
  @pading-left: 18px;
  .img-font-title {
    font-size: 50px;
    padding: 60px 0 0 @pading-left;
  }
  .img-font-content {
    padding: 0 0 100px @pading-left !important;
    .img-font-items {
      &:nth-child(3n) {
        padding-right: @pading-left !important;
      }
      padding-right: 12px !important;
      margin-top: 50px;
    }
    img {
      border-radius: 10px;
    }
    align-items: flex-start;
    .van-grid-item__content--center {
      align-items: flex-start;
      padding: 0;
      &:after {
        border: none;
      }
    }
    .name {
      .lineClamp();
      margin: 10px 0;
      font-size: 38px;
      color: @font-primary-color;
    }
    .recomment-img {
      aspect-ratio: '394:394';
    }
  }
</style>
