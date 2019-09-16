<template>
  <div :class="layoutClass">
    <nuxt />
    <Footer v-if="page.footer" />
  </div>
</template>
<script>
import Footer from './footer'
export default {
  components: { Footer },
  data () {
    return {
    }
  },
  computed: {
    page () {
      let defaultParams = {
        footer: true
      }
      let params = this.$route.matched.map((r) => {
        return (r.components.default.options ? r.components.default.options.page : r.components.default.page)
      })[0]
      return { ...defaultParams, ...params }
    },
    layoutClass () {
      return {
        app: true,
        'has_footer': this.page.footer
      }
    }
  }
}
</script>
<style lang="less">
  .app {
    &.has_footer {
      padding-bottom: @footer-height;
    }
  }
</style>>
