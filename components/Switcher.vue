<template>
  <div class="switcher" :class="{enabled}" @click="handleClick" />
</template>
<script>
export default {
  props: {
    enabled: Boolean
  },
  methods: {
    handleClick () {
      this.$emit('switch')
    }
  }
}
</script>
<style lang="stylus" scoped>
.switcher {
  position: relative;
  box-sizing: border-box;
  width: 32px;
  height: 20px;
  border-radius: 16px;
  border: 2px solid #033354;
  background: transparent;
  transition: 0.5s;
  cursor: pointer;

  &:after {
    position: absolute;
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #EC5D6B;
    top: 3px;
    left: 3px;
  }

  &.enabled {
    background: #7DC475;
    border-color: #7DC475;

    &:after {
      background: #fff;
      left: 16px;
    }
  }
}
</style>
