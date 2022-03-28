<template>
  <master-layout
    :nextText="'Next'"
    :prev="false"
    :next="noAvailableContracts ? false : true"
    :pending="fetchState === 'PENDING'"
    @next="$emit('next')"
  >
    <template #title>
      {{ $t('Step') }} 1
    </template>
    <template #main>
      <div class="main">
        <div class="main__text">
          {{ $t('Select a contract') }}
        </div>
        <with-loader :active="fetchState === 'PENDING'" :withBackground="true">
          <div class="contracts__list">
            <div
              v-for="contract in contracts"
              :key="`contract-${contract.id}`"
              :class="['contracts__item', { picked: contract.id === picked, disabled: contract.used }]"
              @click="pickContract(contract)"
            >
              {{ `${$t('Contract')} ${contract.type}` }}
            </div>
          </div>
          <div class="main__info-box">
            <contract-info v-if="contractData" :contract="contractData" />
          </div>
          <div v-if="noAvailableContracts && fetchState !== 'PENDING'" class="contracts__availability">
            {{ $t('No available contracts') }}
          </div>
        </with-loader>
      </div>
    </template>
  </master-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { all, propEq, find } from 'rambda'
import MasterLayout from './MasterLayout.vue'
import WithLoader from './WithLoader.vue'
import ContractInfo from '@/components/ContractInfo.vue'

export default {
  components: {
    MasterLayout,
    WithLoader,
    ContractInfo
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      fetchState: 'masterStore/fetchState',
      contracts: 'masterStore/contracts',
      picked: 'masterStore/contract'
    }),
    noAvailableContracts () {
      return all(propEq('used', true))(this.contracts)
    },
    contractData () {
      const contract = find(propEq('id', this.picked))(this.contracts)
      return contract
    }
  },
  mounted () {
    this.$store.dispatch('masterStore/checkToken')
  },
  methods: {
    pickContract (contract) {
      if (!contract.used) {
        this.$store.commit('masterStore/UPDATE_CONTRACT', contract.id)
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

  &__info-box {
    margin-top: 10px;
  }

  &__text {
    text-align: center;
    margin-bottom: 30px;
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

    &:first-of-type {
      border-radius: 4px 0px 0px 4px;
    }
    &:last-of-type {
      border-radius:  0px 4px 4px 0px ;
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
}

</style>
