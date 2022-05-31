<template>
  <master-layout
    :nextText="'Next'"
    :pending="fetchState === 'PENDING'"
    @next="nextStep"
    @previous="$emit('previous')"
  >
    <template #title>
      {{ $t('Step') }} 5
    </template>
    <template #main>
      <div class="main">
        <div class="main__text">
          {{ $t('Insert your VPS IP address') }}
        </div>
        <with-loader :active="fetchState === 'PENDING'" :withBackground="true">
          <master-input
            :label="$t('IP')"
            :value="ip"
            :maxlength="30"
            :errors="errors"
            @change-value="handleIP"
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
      errors: []
    }
  },
  computed: {
    ...mapGetters({
      fetchState: 'masterStore/fetchState',
      ip: 'masterStore/ip'
    })
  },
  methods: {
    handleIP (value) {
      this.$store.commit('masterStore/UPDATE_IP', value)
    },
    nextStep () {
      this.$emit('next')
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
