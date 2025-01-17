<template>
  <div class="page">
    <technology-banner />
    <div class="page-block">
      <with-loader :active="fetchState === 'PENDING'">
        <div v-if="fetchState === 'FULFILLED' && nodesList.length === 0" class="empty">
          <CreateNode :limits="nodesLimits" @create="startMaster" />
        </div>
        <div class="nodes">
          <div class="nodes__list">
            <NodeItem
              v-for="node in nodesList"
              :key="`node-list-${node.id}`"
              :node="node"
            />
            <CreateNode
              v-if="fetchState === 'FULFILLED' && nodesList.length !== 0"
              :inList="true"
              :limits="nodesLimits"
              @create="startMaster"
            />
            <div class="nodes__hidden" />
          </div>
        </div>
      </with-loader>
    </div>

    <master-modal @next="nextStep" @done="showDone = true" />
    <master-done v-if="showDone" :active="showDone" @close="showDone = false" />
  </div>
</template>
<script>
import 'oton-vue-components'
import 'oton-vue-components/dist/oton-vue-lib.css'
import { mapGetters } from 'vuex'
import CreateNode from '@/components/CreateNode.vue'
import NodeItem from '@/components/NodeItem.vue'
import MasterModal from '~/components/MasterModal.vue'
import WithLoader from '@/components/WithLoader.vue'
import MasterDone from '@/components/MasterDone.vue'
import techWorks from '@/utils/techWorks'
import TechnologyBanner from '@/components/TechnologyBanner.vue'

export default {
  name: 'IndexPage',
  components: {
    CreateNode,
    NodeItem,
    MasterModal,
    WithLoader,
    MasterDone,
    TechnologyBanner
  },
  layout: 'default',
  middleware: ['isAuth', 'localeRedirect'],
  data () {
    return {
      emptyState: true,
      showModal: false,
      showDone: false,
      interval: null
    }
  },
  computed: {
    ...mapGetters({
      nodesList: 'nodesStore/nodesList',
      fetchState: 'nodesStore/fetchState',
      nodesInProgress: 'installingStore/nodes',
      nodesLimits: 'userStore/nodesLimits'
    })
  },
  mounted () {
    if (techWorks && this.$cookies.get('forTests') !== 'tester') {
      this.$router.push(this.localePath('/tech-works'))
    }

    this.$store.dispatch('nodesStore/fetch')
  },
  beforeDestroy () {
    this.$store.commit('nodesStore/CLEAR_INTERVAL')
  },
  methods: {
    startMaster () {
      this.$store.commit('modalStore/changeCurrentModal', 'MasterModal')
    },
    nextStep () {
      this.$store.dispatch('masterStore/createNode')
    }
  }
}
</script>

<style lang="stylus" scoped>
.page {
  position: relative;
}
.page-block {
  position: relative;
}
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;

  +mediaTablet() {
    padding-top: 60px;
  }
}
.nodes {
  transition: 0.4s;
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__hidden {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    width: 100%;
    max-width: 357px;
    box-sizing: border-box;
    margin-bottom: 24px;
    height: 0;
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

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
