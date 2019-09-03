<template>
  <div>
    <template v-for="(row, index) in rows">
      <van-cell :key="index" value-class="rows-value" class="rows" :value="row.count" is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span class="title"><icon-font :icon-class="row.icon" />{{ row.title }}</span>
        </template>
      </van-cell>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  async asyncData ({ req, res, error, params, $axios }) {
    try {
      let counts = await $axios.post('userSubcount', { uid: 348695741 })
      console.log(counts)
      return {
        shortcut: [
          { title: '最新电音', icon: '' },
          { title: '私藏推荐', icon: '' },
          { title: '亲子频道', icon: '' },
          { title: '古典专区', icon: '' }
        ],
        rows: [
          { title: '本地音乐', icon: 'my_music', count: 0 },
          { title: '最新播放', icon: 'recentlyPlayed', count: counts.newProgramCount },
          { title: '我的电台', icon: 'broadcasting', count: counts.newProgramCount },
          { title: '我的收藏', icon: 'collect', count: counts.newProgramCount },
          { title: 'Sati空间', icon: 'sati', count: counts.newProgramCount }
        ]
      }
    } catch (res) {
    }
  }
}
</script>

<style lang="less" scoped>
  .rows {
    .title {
      font-size: 50px;
    }
    .iconfont {
      font-size: 60px;
      color: @font-red-color;
      margin: 0 73px 0 0;
    }
    .rows-value span {
      font-size: 42px;
    }
  }
</style>
