<template>
  <master-layout
    :nextText="'Next'"
    @next="$emit('next')"
    @previous="$emit('previous')"
  >
    <template #title>
      {{ $t('Step') }} 2
    </template>
    <template #main>
      <div class="main">
        <div class="main__text">
          {{ $t('Insert Digital Ocean token') }}
        </div>
        <with-loader :active="fetchState === 'PENDING'" :withBackground="true">
          <master-input :label="'Digital Ocean token'" :value="token" @change-value="handleToken" />
        </with-loader>
      </div>
    </template>
  </master-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import MasterLayout from './MasterLayout.vue'
import MasterInput from './MasterInput.vue'
import WithLoader from './WithLoader.vue'

export default {
  components: {
    MasterLayout,
    MasterInput,
    WithLoader
  },
  computed: {
    ...mapGetters({
      fetchState: 'masterStore/fetchState',
      token: 'masterStore/token'
    })
  },
  mounted () {
    // this.$store.dispatch('masterStore/checkToken')
  },
  methods: {
    handleToken (value) {
      this.$store.commit('masterStore/UPDATE_TOKEN', value)
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
.loader-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.button {
  margin: 0 auto;
  margin-top: 18px;
  display: block;
}
</style>
