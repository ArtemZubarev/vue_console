<template>
  <master-layout
    :nextText="'Next'"
    :pending="fetchState === 'PENDING' || fetchScript === 'PENDING'"
    :nextDisabled="!didScript"
    @next="nextStep"
    @previous="$emit('previous')"
  >
    <template #title>
      {{ $t('Step') }} 5
    </template>
    <template #main>
      <div class="main">
        <div class="main__text">
          {{ $t('Copy the script and run it in the terminal of your VPS. Wait for the script to execute') }}
        </div>
        <with-loader :active="fetchState === 'PENDING' || fetchScript === 'PENDING'" :withBackground="true">
          <master-script :value="script" :label="$t('Script')" />
          <common-checkbox :value="didScript" :name="$t('I did it')" @change-value="didIt" />
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
      errors: [],
      didScript: false
    }
  },
  computed: {
    ...mapGetters({
      fetchState: 'masterStore/fetchState',
      fetchScript: 'getScript/fetchState',
      script: 'getScript/script'

    })
  },
  mounted () {
    this.$store.dispatch('getScript/getScript', this.ip)
  },
  methods: {
    nextStep () {
      if (this.didScript) {
        this.$emit('next')
      }
    },
    didIt (value) {
      this.didScript = value
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
  max-width: 480px;

  &__text {
    text-align: center;
    margin-bottom: 8px;
    color: $colorFontBase;
    max-width: 336px;
    margin: 0 auto;
    font-size: 14px;
  }
}
.button {
  margin: 0 auto;
  margin-top: 18px;
  display: block;
}
</style>
