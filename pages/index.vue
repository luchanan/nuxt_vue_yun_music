<template>
  <div class="container">
    <van-grid class="recomment" :gutter="10" :column-num="3">
      <van-grid-item v-for="(row, index) in personalizedList" :key="index">
        <van-image :src="row.picUrl" />
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
  async asyncData ({ req, res }) {
    // https://zh.nuxtjs.org/guide/async-data/#asyncdata-%E6%96%B9%E6%B3%95
    try {
      let personalized = await API.excute('personalized', { limit: 6 })
      return {
        personalizedList: personalized.result
      }
    } catch (res) {
    }
  }
}
</script>

<style lang="less">
  .recomment {
    .name {
      .lineClamp()
    }
  }
</style>
