<template>
  <div class="input">
    <label class="input__label" for="">{{ label }}</label>
    <input type="text" class="input__element" :value="value">
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: [String, Number],
      required: true
    }
  }
}
</script>
<style lang="stylus" scoped>
.input {
  &__label {

  }

  &__element {
    border: 2px solid #F7F5EE;
    font-size: 14px;
    font-weight: bold;
    border-radius: 4px;
  }
}
</style>
