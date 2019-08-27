<template>
  <div class="container">
    <div>
      <van-cell-group>
        <van-field
          v-model="phone"
          left-icon="user-o"
        />
        <van-field
          v-model="password"
          type="password"
          left-icon="cluster-o"
        />
      </van-cell-group>
      <van-button round type="danger" size="large" :loading="loading" @click="submit">
        登录
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
      this.$axios.post('mLogin', {
        [account]: this.phone,
        password: this.password
      }).catch((res) => {
        this.$toast.fail(res.error.message)
      })
    }
  }
}
</script>

<style>
</style>
