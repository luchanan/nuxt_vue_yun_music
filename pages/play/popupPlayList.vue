<template>
  <van-popup
    v-model="visible"
    round
    position="bottom"
  >
    <div class="van-hairline--bottom title" flex="cross:center main:justify">
      <div><icon-font class="model" icon-class="loop" />列表循环(149)</div>
      <div class="right">
        <span><icon-font icon-class="add" /></span>
        <span class="collect_text">收藏全部</span>
        <span class="hr van-hairline--right" />
        <icon-font icon-class="delete" />
      </div>
    </div>
    <ul>
      <li v-for="(row, index) in list" :key="index">
        <div class="wrapper van-hairline--bottom" flex="cross:center box:last">
          <div :class="`name ${id == row.id ? 'playing' : ''}`" flex="cross:center">
            <div><icon-font icon-class="sound" /></div>
            <div class="van-ellipsis">
              {{ row.name }}
            </div><div class="gray van-ellipsis">
              - {{ (row.ar.map(item => item.name)).join('/') }} - {{ row.al.name }}
            </div>
          </div>
          <div><van-icon class="clo" name="cross" /></div>
        </div>
      </li>
    </ul>
    <div class="van-hairline--top close" @click="visible = false">
      关闭
    </div>
  </van-popup>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  computed: {
    list () {
      return this.$store.state.player.playList
    },
    id () {
      return this.$store.state.player.currentPlayId
    }
  },
  methods: {
    show () {
      this.visible = true
    }
  }
}
</script>

<style lang="less" scoped>
  .title {
    font-size: 48px;
    height: 150px;
    padding: 0 30px;
    .iconfont {
      font-size: 48px;
      &.model {
        margin: 0 24px 0 0;
      }
    }
    .right {
      span {
        display: inline-block;
      }
      .collect_text {
        margin: 0 0 0 10px;
      }
      .hr {
        height: 55px;
        margin: 8px 20px 0 20px;
        vertical-align: top;
      }
    }
  }
  ul {
    height: 1262px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  li {
    padding-left: 30px;
    font-size: 48px;
    .wrapper {
      padding: 34px 30px 34px 0;
    }
    .gray {
      font-size: 36px;
      color: #565656;
    }
    .name {
      line-height: 63px;
      .iconsound {
        font-size: 48px;
        margin: 0 24px 0 0;
      }
      &.playing {
        color: @font-red-color;
        .gray {
          color: @font-red-color;
        }
      }
    }
    .clo {
      line-height: 63px;
      font-size: 48px;
      vertical-align: top;
    }
  }
  .close {
    font-size: 48px;
    text-align: center;
    padding: 48px 0;
  }
</style>
