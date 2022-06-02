<template>
  <master-layout
    :nextText="'Next'"
    :pending="fetchState === 'PENDING'"
    @next="$emit('next')"
    @previous="$emit('previous')"
  >
    <template #title>
      {{ $t('Step') }} 4
    </template>
    <template #main>
      <div class="main">
        <div class="main__text">
          {{ $t('Select a VPS provider') }}
        </div>
        <with-loader :active="fetchState === 'PENDING'" :withBackground="true">
          <div class="contracts__list">
            <div
              v-for="provider in providers"
              :key="`contract-${provider.value}`"
              :class="['contracts__item', { picked: provider.value === selectedProvider}]"
              @click="pickProvider(provider.value)"
            >
              <svg-icon v-if="provider.value === 'DO'" name="common/do" class="contracts__icon" />
              {{ $t(provider.name) }}
            </div>
          </div>
          <div v-if="selectedProvider == 'other'" class="main__info-box">
            <provider-info />
          </div>
        </with-loader>
      </div>
    </template>
  </master-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import MasterLayout from './MasterLayout.vue'
import WithLoader from './WithLoader.vue'
import ProviderInfo from './ProviderInfo.vue'

export default {
  components: {
    MasterLayout,
    WithLoader,
    ProviderInfo
  },
  data () {
    return {
      providers: [
        { name: 'DigitalOcean', value: 'DO' },
        { name: 'Other VPS provider', value: 'other' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      fetchState: 'masterStore/fetchState',
      selectedProvider: 'masterStore/provider'
    })
  },
  methods: {
    pickProvider (provider) {
      if (provider !== this.selectedProvider) {
        this.$store.commit('masterStore/UPDATE_PROVIDER', provider)
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
  max-width: 240px;

  &__info-box {
    margin-top: 10px;
  }

  &__text {
    text-align: center;
    margin-bottom: 30px;
    color: $colorFontBase;
    font-size: 14px;
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
.contracts{
  &__list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    +mediaTablet() {
      flex-wrap: unset;
    }
  }

  &__item {
    font-size: 14px;
    padding: 8px;
    border: 2px solid $colorBg;
    color: $colorFontBase;
    min-width: 90px;
    text-align: center;
    width: 50%;

    &:first-of-type {
      border-radius: 4px 0px 0px 4px;
    }
    &:last-of-type {
      border-radius:  0px 4px 4px 0px;
      display: flex;
      align-items: center;
    }
    &:not(:disabled) {
      cursor: pointer;
    }

    &.picked {
      background: #317B92;
      color: #fff;
      border-color: #317B92;
    }

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__availability {
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
    color: $colorDanger;
  }

  &__icon {
    width: 20px;
    height: 20px;
    margin-bottom: 2px;
  }
}

</style>
