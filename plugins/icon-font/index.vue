<template>
  <i :class="`iconfont ${!svg ? 'icon' + iconClass : 'svg'}`">
    <svg v-if="svg" class="svg-icon" aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
  </i>
</template>

<script>
export default {
  name: 'IconFont',
  props: {
    svg: {
      type: Boolean,
      default: false
    },
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

<style lang="less">
  @import "~/plugins/icon-font/iconfont.css";
  .iconfont {
    &.svg {
      width: 70px;
      height: 70px;
      display: inline-block;
    }
    .svg-icon {
      width: 100%;
      height: 100%;
      fill: currentColor;
      vertical-align: top;
      overflow: hidden;
    }
  }
</style>
