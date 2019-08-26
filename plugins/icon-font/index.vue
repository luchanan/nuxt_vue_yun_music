<template>
  <i class="icon-font">
    <svg class="svg-icon" aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
  </i>
</template>

<script>
export default {
  name: 'IconFont',
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName () {
      return `#icon${this.iconClass}`
    }
  }
}
</script>

<style scoped lang="less">
  .icon-font {
    width: 70px;
    height: 70px;
    display: inline-block;
    .svg-icon {
      width: 100%;
      height: 100%;
      fill: currentColor;
      vertical-align: top;
      overflow: hidden;
    }
  }
</style>
