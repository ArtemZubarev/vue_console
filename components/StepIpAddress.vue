<template>
  <master-layout
    :nextText="'Create a node'"
    :pending="fetchState === 'PENDING' || fetchIp === 'PENDING'"
    @next="nextStep"
    @previous="$emit('previous')"
  >
    <template #title>
      {{ $t('Step') }} 6
    </template>
    <template #main>
      <div class="main">
        <div class="main__text">
          {{ $t('Insert your VPS IP address') }}
        </div>
        <with-loader :active="fetchState === 'PENDING' || fetchIp === 'PENDING'" :withBackground="true">
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
      fetchIp: 'checkIp/fetchState',
      ip: 'masterStore/ip'
    })
  },
  methods: {
    handleIP (value) {
      if (this.errors.length) {
        this.errors = []
      }
      this.$store.commit('masterStore/UPDATE_IP', value)
    },
    nextStep () {
      // this.$emit('next')
      if (this.ip.trim()) {
        this.checkIp()
      } else {
        this.errors = ['IP address cannot be empty']
      }
    },
    checkIp () {
      Promise.resolve(this.$store.dispatch('checkIp/checkIp', this.ip)).then((res) => {
        if (res) {
          this.$emit('next')
        } else {
          this.errors = ['No access to this IP address']
        }
      })
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
