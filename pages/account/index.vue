<template>
  <div class="account">
    <section class="summary van-hairline--top-bottom" flex="cross:center box:justify">
      <div class="avatar">
        <img>
      </div>
      <div>
        <p class="nick_name">
          无尽
        </p>
        <div class="level">
          <span class=" align-center">9</span>
        </div>
      </div>
      <div class="align-center sign">
        签到
      </div>
    </section>
    <ul class="rows align-center van-hairline--top-bottom" flex="main:justify cross:center box:mean">
      <li>
        <div class="van-hairline--right">
          <p class="title">
            动态
          </p>
          <p class="number">
            0
          </p>
        </div>
      </li>
      <li>
        <div class="van-hairline--right">
          <p class="title">
            关注
          </p>
          <p class="number">
            0
          </p>
        </div>
      </li>
      <li>
        <div>
          <p class="title">
            粉丝
          </p>
          <p class="number">
            0
          </p>
        </div>
      </li>
      <li>
        <div>
          <p class="title">
            我的资料
          </p>
        </div>
      </li>
    </ul>
    <div class="bind_phone">
      绑定手机号，提高帐号安全性，减低帐号被盗风险。 <span class="align-center">立即绑定</span>
    </div>
    <div v-for="(row, index) in rowData" :key="index" class="liGroup">
      <van-cell-group class="group_content" title="  ">
        <van-cell
          v-for="(child, childIndex) in row"
          :key="childIndex"
          :class="`${child.class ? child.class : ''}`"
          value-class="desc"
          title-class="title"
          :value="child.value"
        >
          <template slot="title">
            <span class="title"><icon-font class="left-icon" :icon-class="child.icon" />{{ child.title }}</span>
          </template>
          <icon-font
            slot="right-icon"
            class="right-icon"
            icon-class="arrow-right"
          />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rowData: [
        [{ title: '我的消息', icon: 'message', value: '' }],
        [
          { title: '会员中心', icon: 'vip', value: '免费领福利' },
          { title: '云村有票', icon: 'ticket', value: '' },
          { title: '商城', icon: 'shoppingcar', value: '' },
          { title: '在线听音乐免流量', icon: 'online', value: '' }
        ],
        [
          { title: '设置', icon: 'setting', value: '' },
          { title: '扫一扫', icon: 'scan', value: '' },
          { title: '个性换肤', icon: 'skin', value: '' },
          { title: '夜间模式', icon: 'lamp', value: '' },
          { title: '定时关闭', icon: 'timeout', value: '' },
          { title: '音乐闹钟', icon: 'clock', value: '' },
          { title: '亲子频道', icon: 'baby', value: '' },
          { title: '优惠券', icon: 'coupon', value: '' }
        ],
        [
          { title: '加入网易音乐人', icon: 'join', value: '' },
          { title: '分享网易云音乐', icon: 'share', value: '' },
          { title: '关于', icon: 'about', value: '' }
        ],
        [{ title: '退出登录', icon: '', value: '', class: 'sign_out' }],
        [{ title: '', icon: '', value: '', class: 'hide' }]
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="less">
  .account {
    .summary {
      padding: 44px 30px 44px 44px;
      .avatar {
        width: 182px;
        height: 182px;
        margin-right: 34px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .nick_name {
        font-size: 50px;
        color: @font-primary-color;
        margin-bottom: 26px;
      }
      .level {
        span {
          display: inline-block;
          width: 106px;
          color: #979798;
          border: solid 1px #979798;
          border-radius: 40px;
          font-size: 30px;
          padding: 8px 0;
        }
      }
      .sign {
        border-radius: 40px;
        font-size: 30px;
        color: #ff0000;
        border: solid 1px #ff0000;
        width: 190px;
        padding: 25px 0;
      }
    }
    .rows {
      li {
        padding: 32px;
        .title {
          font-size: 36px;
          color: #979798;
          margin-bottom: 15px;
        }
        .number {
          font-size: 38px;
          color: @font-primary-color;
        }
      }
    }
    .bind_phone {
      font-size: 36px;
      color: @font-primary-color;
      padding: 20px 34px;
      background: #fffce6;
      span {
        border-radius: 40px;
        font-size: 34px;
        color: #ff0000;
        border: solid 1px #ff0000;
        width: 188px;
        padding: 15px 0;
        display: inline-block;
      }
    }
    .liGroup {
      .hide {
        display: none;
      }
      .sign_out {
        color: #D53E34;
        text-align: center;
        .iconfont {
          display: none;
        }
        .desc {
          display: none;
        }
      }
      & > div > div:first-child {
        padding: 0;
        height: 30px;
        background: #eeefff0;
      }
      .group_content {
        & > div {
          padding: 30px 30px 30px 40px;
        }
      }
      .iconfont {
        margin-right: 42px;
        font-size: 50px;
      }
      .title {
        font-size: 50px;
      }
      .desc {
        font-size: 40px;
        color: #979798;
      }
      .right-icon {
        font-size: 40px;
      }
    }
  }
</style>
