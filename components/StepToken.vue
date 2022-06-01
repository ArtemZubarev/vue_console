<template>
  <master-layout
    :nextText="'Create a node'"
    @next="nextStep"
    @previous="$emit('previous')"
  >
    <template #title>
      {{ $t('Step') }} 5
    </template>
    <template #main>
      <div class="main">
        <div class="main__text">
          {{ $t('Insert Digital Ocean token') }}
        </div>
        <with-loader :active="fetchState === 'PENDING'" :withBackground="true">
          <master-input
            :label="$t('Digital Ocean token')"
            :value="token"
            :errors="errors"
            @change-value="handleToken"
          />
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
  data () {
    return {
      errors: []
    }
  },
  computed: {
    ...mapGetters({
      fetchState: 'masterStore/fetchState',
      token: 'masterStore/token'
    })
  },
  methods: {
    handleToken (value) {
      this.$store.commit('masterStore/UPDATE_TOKEN', value)
      this.errors = []
    },
    nextStep () {
      if (this.token.trim()) {
        this.$emit('next')
      } else {
        this.errors = ["Token can't be empty"]
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
