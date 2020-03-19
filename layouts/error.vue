<template>
  <div class="body">
    <div class="code">
      {{ error.statusCode }}
    </div>
    <nuxt-link to="/">
      <van-button plain type="default">
        首 页
      </van-button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="less">
  .body {
    background: #ececec;
    height: calc(100vh - @footer-height);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .code {
    text-align: center;
    font-size: 300px;
    padding: 0;
    text-shadow: 0 0 48px #fefefe;
    color: #b4b4b4;
  }
</style>
