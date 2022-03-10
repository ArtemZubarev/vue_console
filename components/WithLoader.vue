<template>
  <div>
    <slot />
    <div v-if="active" :class="['loader-box', {withBackground: withBackground}]">
      <common-loader :active="active" />
    </div>
  </div>
</template>

<script>
import CommonLoader from '@/components/CommonLoader.vue'

export default {
  components: {
    CommonLoader
  },
  props: {
    active: {
      type: Boolean,
      required: true
    },
    withBackground: {
      type: Boolean,
      required: false,
      default: () => false
    }
  }
}
</script>

<style lang="stylus" scoped>
.loader-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;

  &.withBackground {
    background: rgba(255, 255, 255, 0.5);
  }
}
</style>
