<template>
  <master-layout
    :nextText="'Next'"
    @next="$emit('next')"
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
        <with-loader :active="fetchState === 'PENDING'" :withBackground="true">
          <master-input :label="'Wallet address'" :value="address" @change-value="handleAddress" />
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
  props: {

  },
  computed: {
    ...mapGetters({
      fetchState: 'masterStore/fetchState',
      address: 'masterStore/address'
    })
  },
  methods: {
    handleAddress (value) {
      this.$store.commit('masterStore/UPDATE_ADDRESS', value)
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
  }
}
.button {
  margin: 0 auto;
  margin-top: 18px;
  display: block;
}
</style>
