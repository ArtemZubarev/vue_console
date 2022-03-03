<template>
  <svg-icon name="common/logo" class="logo" />
</template>

<script>
export default {
  name: 'LogoNodes'
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
