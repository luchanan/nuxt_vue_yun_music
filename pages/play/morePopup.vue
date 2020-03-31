<template>
  <van-popup
    v-model="visible"
    round
    position="bottom"
  >
    <div class="van-hairline--bottom title" flex="cross:center main:justify">
      <div>
        <div class="songname">
          歌曲:相遇
        </div>
        <div class="memo">
          该
        </div>
      </div>
      <div>
        <div class="open">
          开通音乐包
        </div>
      </div>
    </div>
    <ul>
      <li flex="cross:center box:first">
        <div class="icon">
          <icon-font icon-class="add" />
        </div>
        <div class="name van-hairline--bottom">
          收藏到歌单
        </div>
      </li>
    </ul>
  </van-popup>
</template>

<script>
export default {
  data () {
    return {
      visible: false
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
    padding: 27px 30px;
    .songname {
      font-size: 4px;
      color: #555656;
    }
    .memo {
      font-size: 32px;
      color: #6E6F6F;
      margin: 10px 0 0 0;
    }
    .open {
      font-size: 42px;
      border: solid 2px @font-red-color;
      color: @font-red-color;
      border-radius: 50px;
      padding: 14px 20px;
    }
  }
  ul {
    height: 1126px;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
  }
  li {
    .icon {
      padding: 43px 30px;
      .iconfont {
        font-size: 60px;
        color: @font-red-color;
      }
    }
    .name {
      font-size: 50px;
      padding: 43px 0;
    }
  }
</style>
