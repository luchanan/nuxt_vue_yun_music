<template>
  <div class="cellphone">
    <div>
      <van-cell-group>
        <van-field
          v-model="phone"
          placeholder="手机号"
          @touchstart.native.stop="showKeyboard = true"
        >
          <icon-font
            slot="left-icon"
            class="left-icon"
            icon-class="cellphone"
          />
        </van-field>
        <van-field
          v-model="password"
          placeholder="密码"
          type="password"
        >
          <icon-font
            slot="left-icon"
            class="left-icon"
            icon-class="password"
          />
        </van-field>
      </van-cell-group>
      <van-button :loading="loading" round type="danger" size="large" @click="submit">
        登录
      </van-button>
      <div class="underline_gray">
        重设密码
      </div>
    </div>
    <van-number-keyboard
      v-model="phone"
      :show="showKeyboard"
      :maxlength="11"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
import { Cookie } from '@/utils/storage'
export default {
  data () {
    return {
      showKeyboard: false,
      loading: false,
      phone: '',
      password: ''
    }
  },
  asyncData () {
  },
  methods: {
    submit () {
      let account = 'phone'
      this.loading = true
      this.$axios.post('mLogin', {
        [account]: this.phone,
        password: this.password
      }).then((res) => {
        Cookie.set('userId', res.account.id)
        this.$router.push('/')
        this.loading = false
      }).catch((res) => {
        this.loading = false
        this.$toast.fail(res.error.message)
      })
    }
  }
}
</script>

<style lang="less">
  .cellphone {
    padding: 0 48px;
    > div > div > div {
      line-height: 50px;
    }
    .van-cell-group {
      .van-cell {
        padding: 0;
        display: flex;
        align-items: center;
      }
    }
    input {
      font-size: 50px;
      height: 130px;
    }
    .van-field__left-icon {
      margin-right: 0;
    }
    .left-icon {
      font-size: 56px;
      color: #8e8e9f;
      margin-right: 40px;
      vertical-align: middle;
    }
    button {
      margin-top: 90px;
      height: 118px;
      line-height: 118px;
      font-size: 50px;
    }
    .underline_gray {
      font-size: 40px;
      line-height: 50px;
      color: #979798;
      text-align: center;
      margin: 78px 0 0 0;
      text-decoration: underline;
      text-underline-position: under;
    }
  }
</style>
