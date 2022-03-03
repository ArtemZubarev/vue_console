<template>
  <svg-icon :name="defaultColors ? 'common/logo-nodes-common' : 'common/logo-nodes'" class="logo" />
</template>

<script>
export default {
  name: 'OtonLogo',
  props: {
    defaultColors: {
      type: Boolean,
      required: false,
      dedfault: () => false
    }
  }
}
</script>

<style lang="stylus" scoped>
.logo {
  display: block;
  width: 80px;
  height: 44px;
  color: $colorFontBase;
  transition: all 0.1s;

  +mediaTablet() {
    width: 88px;
    height: 48px;

    &:hover {
      color: $colorDanger;
    }
  }
}
</style>
