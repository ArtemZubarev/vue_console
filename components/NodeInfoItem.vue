<template>
  <div class="box">
    <div class="info" :class="{sm: size === 'sm', horizontal}">
      <div class="info__title">
        {{ $t(title) }}
      </div>
      <div class="info__value" :class="{success: valueStatus === 'ok', danger: valueStatus === 'no_ok'}">
        {{ value }}
      </div>
    </div>
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    size: {
      type: String,
      required: false,
      default: 'm'
    },
    horizontal: {
      type: Boolean,
      required: false,
      default: false
    },
    valueStatus: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
<style lang="stylus" scoped>
.box {
  display: flex;

}
.info {
  display: flex;
  flex-direction: column;

  &__title {
    color: #033354;
    opacity: 0.4;
    font-size: 12px;
    font-weight: bold;
  }
  &__value {
    font-size: 24px;
    font-weight: bold;
    margin-top: 4px;

    &.danger {
      color: #EC5D6B;
      font-weight: bold!important;
    }
    &.success {
      color: #7DC475;
      font-weight: bold!important;
    }
  }

  &.sm {
    margin-bottom: 8px;

    .info {
      &__title {
        font-size: 14px;
        font-weight: normal;
        width: 90px;
      }

      &__value {
        font-size: 14px;
        font-weight: normal;
        margin-top: 0px;
      }
    }
  }

  &.horizontal {
    flex-direction: row;
  }
}
</style>
