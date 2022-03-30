<template>
  <div class="node">
    <div class="node__head">
      <div class="node__title">
        <input v-if="editName" v-model="nodeName" class="node__input" type="text" :maxlength="40">
        <span v-else>
          {{ nodeName }}
        </span>
        <button v-if="editName" class="node__accept" @click="saveName">
          {{ $t('Save') }}
        </button>
        <svg-icon v-else class="node__edit" name="common/edit" @click="editName = !editName" />
      </div>

      <div class="node__switcher">
        <!-- <switcher :enabled="status" @switch="switchStatus" /> -->
      </div>
    </div>
    <div class="node__content">
      <div class="node__info">
        <div class="node__block">
          <node-info-item :title="'Earned in total'" :value="node.earned" />
        </div>
        <div class="node__block">
          <node-info-item :title="'Connected nodes'" :value="node.connected" />
        </div>
        <div class="node__block">
          <node-info-item :title="'Votings'" :value="node.votings" />
        </div>
        <div class="node__block">
          <node-info-item :title="'Last block'" :value="node.blocks" />
        </div>
      </div>
      <contract-info v-if="contractData" :contract="contractData" />
      <div class="node__block wallet">
        <copy-wallet :address="nodeAddress || ''" />
        <svg-icon v-if="!editAddress" class="node__edit" name="common/edit" @click="editAddress = !editAddress" />
      </div>
      <div class="node__block full">
        <node-info-item :title="'IP'" :value="node.ip" :size="'sm'" />
        <node-info-item :title="'Uptime'" :value="uptime" :size="'sm'" />
        <node-info-item :title="'Version'" :value="node.version" :size="'sm'" />
        <node-info-item
          :title="'Status'"
          :value="$t(statuses[node.status])"
          :size="'sm'"
          :valueStatus="node.status === 6 ? '' : 'ok'"
        />
      </div>
    </div>
    <div class="node__footer">
      <div>
        <button class="node__button" :disabled="nodeInProgress" @click="restartNode">
          {{ $t('Restart server') }}
        </button>
        <button class="node__button" :disabled="nodeInProgress" @click="updateNode">
          {{ $t('Update software') }}
        </button>
      </div>
      <div>
        <button class="node__button filled" @click="deleteNode">
          {{ $t('Delete this node') }}
        </button>
      </div>
    </div>
    <div
      v-if="fetchState === 'PENDING' || contractsFetch === 'PENDING' || pending "
      class="loader-box"
    >
      <common-loader :active="fetchState === 'PENDING' || contractsFetch === 'PENDING' || pending" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import * as dayjs from 'dayjs'
// import Switcher from '@/components/Switcher.vue'
import CommonLoader from '@/components/CommonLoader.vue'
import NodeInfoItem from '@/components/NodeInfoItem.vue'
import CopyWallet from '~/components/CopyWallet.vue'
import nodeStatuses from '@/utils/nodeStatuses'
import ContractInfo from '~/components/ContractInfo.vue'

dayjs.extend(duration)
dayjs.extend(relativeTime)

export default {
  name: 'NodePage',
  components: {
    // Switcher,
    CommonLoader,
    NodeInfoItem,
    CopyWallet,
    ContractInfo
  },
  middleware: 'isAuth',
  data () {
    return {
      status: false,
      pending: false,
      statuses: nodeStatuses,
      editName: false,
      editAddress: false
    }
  },
  computed: {
    ...mapGetters({
      node: 'nodeStore/node',
      fetchState: 'nodeStore/fetchState',
      contractsFetch: 'masterStore/fetchState',
      contracts: 'masterStore/contracts'
    }),
    started () {
      if (this.node.uptime) {
        const now = dayjs().unix()
        const start = now - Number(this.node.uptime)

        return dayjs.unix(start).format('DD.MM.YYYY')
      }
      return ''
    },
    uptime () {
      return dayjs.duration(this.node.uptime).humanize()
    },
    nodeInProgress () {
      return this.node.status !== 5 && this.node.status !== 6 && this.node.status !== 7
    },
    nodeName: {
      get () {
        return this.node.name
      },
      set (value) {
        return this.$store.commit('nodeStore/UPDATE_NAME', value)
      }
    },
    nodeAddress: {
      get () {
        return this.node.address
      },
      set (value) {
        return this.$store.commit('nodeStore/UPDATE_ADDRESS', value)
      }
    },
    contractData () {
      return this.node.contract
    }
  },
  mounted () {
    const { id } = this.$route.params
    this.$store.dispatch('nodeStore/fetch', id)
  },
  beforeDestroy () {
    this.$store.commit('nodeStore/CLEAR_INTERVAL')
  },
  methods: {
    switchStatus () {
      this.status = !this.status
      this.pending = true
      setTimeout(() => {
        this.pending = false
      }, 2000)
    },
    saveName () {
      Promise.resolve(this.$store.dispatch('nodeStore/saveData', 'name')).then((res) => {
        if (res) {
          this.editName = false
        }
      })
    },
    saveAddress () {
      Promise.resolve(this.$store.dispatch('nodeStore/saveData', 'address')).then((res) => {
        if (res) {
          this.editAddress = false
        }
      })
    },
    deleteNode () {
      const { id } = this.$route.params
      // this.$store.commit('modalStore/changeCurrentModal', 'ConfirmModal')
      Promise.resolve(this.$store.dispatch('nodeStore/deleteNode', id)).then((res) => {
        if (res) {
          this.$router.push('/')
        }
      })
    },
    restartNode () {
      const { id } = this.$route.params
      this.$store.dispatch('nodeStore/restartNode', id)
    },
    updateNode () {
      const { id } = this.$route.params
      this.$store.dispatch('nodeStore/updateNode', id)
    }
  }
}
</script>

<style lang="stylus" scoped>
.node {
  position: relative;
  overflow: hidden;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border-radius: 8px;
  padding: 19px 24px;
  width: 100%;
  box-sizing: border-box;

  &__input {
    border: none;
    border-bottom: 2px solid $colorFontBase;
    font-size: 20px;
  }

  &__edit {
    width: 18px;
    height: 19px;
    margin-bottom: -3px;
    display: inline-block;
    opacity: $colorFontBase;
    opacity: 0.6;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  &__accept {
    font-size: 12px;
    background: $colorFontBase;
    color: $colorFiller;
    padding: 2px 4px;
    border-radius: 2px;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }

  &__content {
    margin-top: 8px;
    margin-bottom: 10px;
    padding-top: 12px;
    display: flex;
    flex-wrap: wrap;
    max-width: 632px;
    flex-direction: column;
  }

  &__footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 16px;
    border-top: 2px solid #F7F5EE;
  }

  &__title {
    font-size: 20px;
    font-weight: bold;
    color: $colorFontBase;
  }

  &__head {
    display: flex;
    justify-content: space-between;
    padding-bottom: 8px;
    border-bottom: 2px solid #F7F5EE;
  }

  &__button {
    padding: 12px 16px;
    border: 2px solid #317B92;
    border-radius: 4px;
    color: #033354;
    font-weight: bold;
    margin-bottom: 10px;

    +mediaTablet() {
      margin-bottom: 0;
    }
    &:not(:last-of-type) {
      margin-right: 16px;
    }

    &:hover {
      opacity: 0.8;
    }

    &.filled {
      background: #EC5D6B;
      color: #fff;
      border-color: #EC5D6B;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;

      &:hover {
        opacity: 0.6;
      }
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;

    +mediaTablet() {
      flex-direction: row;
    }
  }

  &__block {
    width: 25%;
    margin-bottom: 16px;
    display: flex;

    &.wallet {
      width: 100%;
      border-bottom: 2px solid $colorBg;
      padding-bottom: 10px;
    }

    &.full {
      width: 100%;
      flex-wrap: wrap;

      +mediaTablet() {
        width: 50%;

      }

      & > div {
        width: 50%;

        +mediaTablet() {
          width: 50%;
          flex-wrap: wrap;
        }

        // +mediaTablet() {
        //   width: 160px;
        // }
      }
    }
  }

  &__inner {
    margin-left: 33px;
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
</style>
