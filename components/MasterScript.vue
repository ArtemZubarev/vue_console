<template>
  <div :class="['script']">
    <div class="script__box flexed">
      <label class="script__label" for="">{{ label }}</label>
      <span v-if="copied" class="script__copy copied">
        {{ $t('Copied') }}
      </span>
      <span v-else class="script__copy" @click="copy">
        {{ $t('Copy') }}
      </span>
    </div>

    <div>
      <textarea
        class="script__text"
        rows="7"
        :value="value"
      />
    </div>
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
  data () {
    return {
      copied: false
    }
  },
  methods: {
    async copy () {
      try {
        const isCopied = await this.$copyText(this.value)

        if (isCopied) {
          this.copied = true
          setTimeout(() => {
            this.copied = false
          }, 3000)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.script {
  .flexed {
    display: flex;
    justify-content: space-between;
  }
  &__box {
    width: 100%;
  }
  &__label {
    color: $colorFontBase;
    opacity: 0.4;
    font-size: 14px;
  }

  &__text {
    background: $colorFontBase;
    border-radius: 4px;
    width: 100%;
    resize: none;
    color: #fff;
    padding: 12px 8px;
    font-size: 14px;
    box-sizing: border-box;
    margin-top: 4px;
    border: none;
  }

  &__copy {
    font-size: 14px;
    text-decoration: underline;
    color: $colorLink;
    cursor: pointer;

    &.copied {
      font-weight: bold;
      color: $colorFontBase;
      text-decoration: none;
      cursor: default;
    }
  }
}
</style>
