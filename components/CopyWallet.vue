<template>
  <div class="copy">
    <node-info-item :title="'Wallet'" :value="address" :size="'sm'" />
    <button class="copy__button" @click="copy">
      <svg-icon
        name="common/copy_alt"
        :class="['copy__icon', { copy__icon_copied: copied }]"
      />
    </button>
    <span v-if="copied" class="copy__copied"> {{ $t("Copied") }} </span>
  </div>
</template>

<script>
import NodeInfoItem from '@/components/NodeInfoItem.vue'

export default {
  components: {
    NodeInfoItem
  },
  props: {
    address: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      copied: false
    }
  },
  methods: {
    copy () {
      this.$copyText(this.address).then(
        (e) => {
          console.log('Copied')
          console.log(e)
        },
        (e) => {
          console.log('Can not copy')
          console.log(e)
        }
      )
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 3000)
    }
  }

}
</script>

<style lang="stylus" scoped>
.copy {
  display: flex;
  &__button {
    display: inline-block;
    margin: 0 0px -11px -5px;
    padding: 5px;

    +mediaTablet() {
      margin: 0 0 -5px 5px;
      padding: 0;
    }
  }

  &__icon {
    display: block;
    width: 16px;
    height: 16px;
    opacity: 0.3;

    &_copied {
      opacity: 1;
    }

    &:hover {
      opacity: 1;
    }

    +mediaTablet() {
      width: 20px;
      height: 20px;
    }
  }

  &__copied {
    position: relative;
    margin-top: 17px;
    bottom: 4px;
    margin-left: 4px;
    display: inline-block;
    width: 65px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.62px;

    +mediaTablet() {
      position: static;
      font-size: 12px;
    }
  }
}
</style>
