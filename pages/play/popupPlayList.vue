<template>
  <van-popup
    v-model="visible"
    round
    position="bottom"
  >
    <div class="van-hairline--bottom title" flex="cross:center main:justify">
      <div><icon-font icon-class="loop" />列表循环(149)</div>
      <div>
        收藏全部
      </div>
    </div>
    <ul>
      <li>
        <div class="wrapper van-hairline--bottom" flex="cross:center box:first">
          <div flex="cross:center">
            <div>
              纪念
            </div><div class="gray">
              - 林嘉欣
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="van-hairline--top close">
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
  }
  .close {
    font-size: 48px;
    text-align: center;
    padding: 48px 0;
  }
</style>
