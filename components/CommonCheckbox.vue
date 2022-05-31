<template>
  <div class="check">
    <input :id="name" v-model="computedValue" type="checkbox" class="check__input">
    <label :for="name" :class="['check__label', {checked: computedValue}]">{{ $t(name) }}</label>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      required: true,
      type: String
    },
    value: {
      required: true,
      type: Boolean
    }
  },
  computed: {
    computedValue: {
      get () {
        return this.value
      },
      set () {
        this.$emit('change-value', !this.value)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.check {
  margin-top: 12px;
  &__input {
    visibility: hidden;
  }
  &__label {
    position: relative;
    font-size: 14px;
    margin-left: 4px;
    cursor: pointer;

    &:before {
      position: absolute;
      content: '';
      top: 0px;
      left: -21px;
      width: 16px;
      height: 16px;
      border: 1px solid $colorFontBase;
      border-radius: 2px;
      box-sizing: border-box;

    }
    &.checked {
      &:after {
        position: absolute;
        top: 4px;
        left: -17px;
        content: '';
        width: 8px;
        height: 8px;
        background: $colorSuccess 0% 0% no-repeat padding-box;
      }
    }
  }

}
</style>
