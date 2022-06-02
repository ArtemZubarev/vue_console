<template>
  <master-layout
    :nextText="'Next'"
    :pending="fetchState === 'PENDING' || checkAddressState === 'PENDING'"
    @next="nextStep"
    @previous="$emit('previous')"
  >
    <template #title>
      {{ $t('Step') }} 3
    </template>
    <template #main>
      <div class="main">
        <div class="main__text">
          {{ $t('Insert wallet address for reward') }}
        </div>
        <with-loader :active="fetchState === 'PENDING' || checkAddressState === 'PENDING'" :withBackground="true">
          <master-input
            :label="$t('Wallet address')"
            :value="address"
            :errors="errors"
            :success="isValid === true"
            @change-value="handleAddress"
          />
        </with-loader>
      </div>
    </template>
  </master-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import MasterLayout from './MasterLayout.vue'

export default {
  components: {
    MasterLayout
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      fetchState: 'masterStore/fetchState',
      address: 'masterStore/address',
      checkAddressState: 'checkStore/fetchState',
      isValid: 'checkStore/isValid',
      errors: 'checkStore/errors'
    })
  },
  methods: {
    handleAddress (value) {
      this.$store.commit('masterStore/UPDATE_ADDRESS', value)
      this.checkAddressValidity(value)
    },
    checkAddressValidity (value) {
      this.$store.dispatch('checkStore/checkAddress', value)
    },
    nextStep () {
      if (this.address.trim()) {
        if (this.isValid) {
          this.$emit('next')
        }
      } else {
        this.checkAddressValidity(this.address)
      }
    }
  }

}
</script>

<style lang="stylus" scoped>
.main {
  position: relative;
  display: inline-block;
  margin: 0 auto;
  width: 100%;
  max-width: 353px;

  &__text {
    text-align: center;
    margin-bottom: 8px;
    color: $colorFontBase;
    font-size: 14px;
  }
}
.button {
  margin: 0 auto;
  margin-top: 18px;
  display: block;
}
</style>
