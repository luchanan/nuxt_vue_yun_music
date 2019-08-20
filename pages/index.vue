<template>
  <div class="container">
    <van-grid class="recomment" :gutter="10" :column-num="3">
      <van-grid-item v-for="(row, index) in personalizedList" :key="index">
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
import * as API from '~/api/request'
export default {
  async asyncData ({ req, res, error, params }) {
    // https://zh.nuxtjs.org/guide/async-data/#asyncdata-%E6%96%B9%E6%B3%95
    try {
      let personalized = await API.excute('personalized', { limit: 6 })
      return {
        personalizedList: personalized.result
      }
    } catch (res) {
      error({ statusCode: params.statusCode, message: 'Post not found' })
    }
  }
}
</script>

<style lang="less">
  .recomment {
    .name {
      .lineClamp();
      font-size: 38px;
      color: @font-primary-color;
    }
    .recomment-img {
      aspect-ratio: '394:394';
    }
  }
</style>
