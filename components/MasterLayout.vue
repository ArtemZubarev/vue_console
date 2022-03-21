<template>
  <div class="master">
    <div class="master__head">
      <slot name="header" />
    </div>
    <div class="master__title">
      <slot name="title" />
    </div>
    <div class="master__main">
      <slot name="main" />
    </div>
    <div v-if="footer" class="master__footer">
      <common-button
        v-if="next"
        class="button"
        :filled="true"
        :text="$t(nextText)"
        :disabled="pending"
        @click="$emit('next')"
      />
      <common-button
        v-if="prev"
        class="button"
        :filled="false"
        :text="$t('Back')"
        :disabled="pending"
        @click="$emit('previous')"
      />
    </div>
  </div>
</template>

<script>
import CommonButton from './CommonButton.vue'

export default {
  components: {
    CommonButton
  },
  props: {
    nextText: {
      type: String,
      required: true
    },
    prev: {
      type: Boolean,
      required: false,
      default: () => true
    },
    next: {
      type: Boolean,
      required: false,
      default: () => true
    },
    footer: {
      type: Boolean,
      required: false,
      default: () => true
    },
    pending: {
      type: Boolean,
      required: false,
      default: () => false
    }
  }

}
</script>

<style lang="stylus" scoped>
.master {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__head {
    width: 100%;
    margin-top: 24px;
  }
  &__title {
    position: relative;
    display: block;
    width: 100%;
    max-width: 384px;
    font-size: 20px;
    font-weight: bold;
    color: #033354;
    text-align: center;
    padding-top: 8px;
    padding-bottom: 2px;
    // margin-top: -33px;
    z-index: 3;
    background: #fff;
  }

  &__main {
    display: flex;
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 10px 30px 10px;
  }

  &__footer {
    width: calc(100% - 46px);
    border-top: 2px solid #F7F5EE;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    padding: 24px 0;
  }
}
</style>
