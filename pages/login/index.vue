<template>
  <div class="login_index">
    <div>
      <div class="icon align-center">
        <icon-font icon-class="yun" svg />
      </div>
      <div class="button_wrapper">
        <van-button
          class="button"
          round
          size="large"
          hairline
          type="primary"
        >
          手机号登录
        </van-button>
        <van-button class="button" round size="large" hairline type="primary">
          注册
        </van-button>
      </div>
    </div>
    <div class="underline_gray">
      游客登录
    </div>
    <div class="button_wrapper">
      <van-divider>其他登录方式</van-divider>
    </div>
    <div class="icons" flex="cross:center main:justify box:mean">
      <div>
        <div class="icon_warpper align-center">
          <icon-font icon-class="wechat" svg />
        </div>
        <div class="name align-center">
          微信
        </div>
      </div>
      <div>
        <div class="icon_warpper align-center">
          <icon-font icon-class="qq" svg />
        </div>
        <div class="name align-center">
          QQ
        </div>
      </div>
      <div>
        <div class="icon_warpper align-center">
          <icon-font icon-class="sina" svg />
        </div>
        <div class="name align-center">
          微博
        </div>
      </div>
      <div>
        <div class="icon_warpper align-center">
          <icon-font icon-class="yi" svg />
        </div>
        <div class="name align-center">
          网易
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="less">
  .login_index {
    .icon {
      .svg {
        width: 270px;
        height: 270px;
      }
      margin: 368px 0 223px 0;
    }
    .button_wrapper {
      padding: 0 136px;
      .button {
        font-size: 50px;
        color: #d33a31;
        height: 124px;
        line-height: 122px;
        background: #fff;
        margin: 60px 0 0 0;
        border-color: #d33a31;
      }
    }
    .underline_gray {
      font-size: 40px;
      line-height: 50px;
      color: #979798;
      text-align: center;
      margin: 80px 0 460px 0;
      text-decoration: underline;
    }
    .icons {
      .icon_warpper {
        width: 126px;
        height: 126px;
        margin: 0 auto;
        position: relative;
        border-radius: 50%;
        border: solid 1px #949494;
      }
      .iconfont.svg {
        width: 70px;
        height: 70px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -35px;
        margin-top: -35px;
      }
      .name {
        font-size: 36px;
        color: #949494;
        padding: 30px 0;
      }
    }
  }
</style>
