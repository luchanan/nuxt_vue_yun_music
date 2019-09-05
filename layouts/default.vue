<template>
  <div :class="layoutClass">
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import Footer from './footer'
export default {
  components: { Footer },
  data () {
    return {
      hasFooter: true
    }
  },
  computed: {
    layoutClass () {
      return {
        app: true,
        'has_footer': this.hasFooter
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
