<template>
  <div class="box">
    <div class="info" :class="{sm: size === 'sm', horizontal}">
      <div class="info__title">
        {{ $t(title) }}
      </div>
      <a
        v-if="linkValue"
        :href="linkValue"
        target="_blank"
        class="info__value linked"
        :class="{success: valueStatus === 'ok', danger: valueStatus === 'not_ok'}"
      >
        {{ value }}
      </a>
      <div
        v-else
        class="info__value"
        :class="{success: valueStatus === 'ok', danger: valueStatus === 'not_ok'}"
      >
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
      required: false,
      default: ''
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
    },
    linkValue: {
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
  width: 100%;

  &__title {
    color: $colorFontBase;
    opacity: 0.4;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;

    +mediaTablet() {
      width: 100%!important;
    }
  }
  &__value {
    font-size: 24px;
    font-weight: bold;
    margin-top: 4px;
    color: $colorFontBase;
    overflow: hidden;
    text-overflow: ellipsis;

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
        text-transform: unset;
      }

      &__value {
        font-size: 14px;
        font-weight: normal;
        margin-top: 0px;

        &.linked {
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }

  &.horizontal {
    flex-direction: row;
  }
}
</style>
