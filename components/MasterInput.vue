<template>
  <div :class="['input', {success: success}]">
    <label class="input__label" for="">{{ label }}</label>
    <input
      v-model="inputModel"
      type="text"
      :class="['input__element', {danger: errors && errors.length, success: success}]"
    >
    <div v-if="errors && errors.length" class="input__errors">
      <div
        v-for="error in errors"
        :key="error"
        class="errors__item"
      >
        {{ $t(error) }}
      </div>
    </div>
    <!-- <span v-if="success" class="input__correct">;</span> -->
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
    },
    errors: {
      type: Array,
      required: false,
      default: () => []
    },
    success: {
      type: Boolean,
      required: false,
      default: false
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
  position: relative;

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

    &.danger {
      border-color: $colorDanger;
    }
    &.success {
      border-color: $colorSuccess;
    }
  }

  &.success {
      &:after {
        content: '\2713'  ;
        position: absolute;
        right: 10px;
        top: 28px;
        color: $colorSuccess;
      }
    }

  &__errors {
    font-size: 12px;
    color: $colorDanger;
  }
}
</style>
