<template>
  <footer class="footer van-hairline--top" flex="main:center box:mean">
    <nuxt-link v-for="(row, index) in footNav" :key="index" :to="row.path" flex="main:center">
      <div class="items">
        <icon-font :icon-class="row.icon" svg />
        <div class="title">
          {{ row.name }}
        </div>
      </div>
    </nuxt-link>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      footNav: [
        { name: '发现', icon: 'find', path: '/' },
        { name: '视频', icon: 'video', path: '/video' },
        { name: '我的', icon: 'my_music', path: '/member/my' },
        { name: '朋友', icon: 'friend', path: '/friend' },
        { name: '帐号', icon: 'account', path: '/account' }
      ]
    }
  }
}
</script>
<style lang="less">
  .footer {
    position: fixed !important;
    bottom: 0;
    left: 0;
    right: 0;
    background: @font-white-color;
    z-index: 3;
    padding: 18px 0 10px 0;
    a {
      color: #969696;
      font-size: 30px;
      &.nuxt-link-exact-active {
        color: @font-red-color;
      }
    }
    .iconfont {
      width: 65px;
      height: 65px;
    }
    .title {
      margin-top: 6px;
    }
  }
</style>
