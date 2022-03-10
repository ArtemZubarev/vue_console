<template>
  <div class="input">
    <label class="input__label" for="">{{ label }}</label>
    <input v-model="inputModel" type="text" class="input__element">
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
  },
  computed: {
    inputModel: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('change-value', value)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.input {
  display: flex;
  flex-direction: column;
  &__label {
    color: $colorFontBase;
    opacity: 0.4;
    font-size: 14px;
  }

  &__element {
    font-size: 14px;
    font-weight: bold;
    border: 2px solid #F7F5EE;
    border-radius: 4px;
    padding: 11px 8px;
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
