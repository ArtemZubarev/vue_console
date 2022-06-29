<template>
  <div
    v-if="state === 'PENDING' || state === 'INIT' || active"
    :class="['commonLoader', { placeholder: isPlaceholder, top, centered }]"
  >
    <div class="spinnerBox" :style="{height: `${spinnerSize}px`, width: `${spinnerSize}px`}">
      <CommonSpinner />
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: 'CommonLoader',

  props: {
    state: {
      type: String,
      required: false,
      default: ''
    },
    isPlaceholder: {
      type: Boolean,
      required: false
    },
    active: {
      type: Boolean,
      required: false
    },
    top: {
      type: Boolean,
      required: false
    },
    spinnerSize: {
      type: Number,
      default: 60
    },
    centered: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.commonLoader {
  width: 100%;
  display: flex;
  align-items: center;
  margin: auto;

  &.centered {
    justify-content: center;
  }

  &.placeholder {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background: rgba(#fff, 0.4);
  }

  &.top {
    align-items: flex-start;
  }
}

</style>
