<template>
  <button
    :class="['button', {filled: filled}]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    {{ text }}
  </button>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    filled: {
      required: false,
      type: Boolean,
      default: false
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="stylus" scoped>
.button {
  box-sizing: border-box;
  padding: 12px 16px;
  border: 2px solid #317B92;
  border-radius: 4px;
  color: #033354;
  font-weight: bold;
  // &:not(:last-of-type) {
  //   margin-right: 16px;
  // }

  &:hover {
    opacity: 0.8;
  }

  &.filled {
    background: #317B92;
    color: #fff;
    border-color: #317B92;
  }
}
</style>
