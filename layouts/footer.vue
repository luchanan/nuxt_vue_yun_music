<template>
  <van-tabbar route class="footer" active-color="#fa5143" inactive-color="#969696">
    <van-tabbar-item v-for="(row, index) in footNav" :key="index" :to="row.path">
      <icon-font slot="icon" slot-scope="props" :icon-class="row.icon" :class="props.active ? 'active' : 'inactive'" svg />
      <div class="title">
        {{ row.name }}
      </div>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  components: {
    'van-tabbar': Tabbar,
    'van-tabbar-item': TabbarItem
  },
  data () {
    return {
      footNav: [
        { name: '发现', icon: 'find', path: '/' },
        { name: '视频', icon: 'video', path: '/video' },
        { name: '我的', icon: 'my_music', path: '/my' },
        { name: '朋友', icon: 'friend', path: '/friend' },
        { name: '帐号', icon: 'account', path: '/account' }
      ]
    }
  }
}
</script>
<style lang="less">
  .footer {
    right: 0;
    padding: 18px 0 10px 0;
    height: @footer-height !important;
    z-index: 3 !important;
    .iconfont {
      width: 65px;
      height: 65px;
    }
    .title {
      margin-top: 18px;
      font-size: 30px;
    }
    .van-tabbar-item__icon {
      margin-bottom: 0;
    }
  }
</style>
