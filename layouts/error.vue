<template>
  <div>
    <div>{{ error.statusCode }}</div>
    <nuxt-link to="/">
      首 页
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
