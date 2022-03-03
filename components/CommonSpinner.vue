<template>
  <svg-icon name="common/simple-oton-logo" class="spinner" />
</template>

<script >

export default {
  name: 'CommonSpinner',
  components: { },
  props: {}
}
</script>
<style lang="stylus">
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
<style lang="stylus" scoped>
.spinner {
  animation: rotating 1.7s linear infinite;
  width: 100%;
  height: 100%;
  color: $colorFontBase;
}
</style>
