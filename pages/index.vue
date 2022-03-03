<template>
  <div class="page">
    <div v-if="fetchState === 'FULFILLED' && nodesList.length === 0" class="empty">
      <CreateNode @create="startMaster" />
    </div>
    <div class="nodes">
      <div class="nodes__list">
        <NodeItem v-for="node in nodesList" :key="`node-list-${node.id}`" :node="node" />
        <div class="nodes__hidden" />
      </div>
    </div>
    <div v-if="fetchState === 'PENDING'" class="loader-box">
      <common-loader :active="fetchState === 'PENDING'" />
    </div>
    <!-- <vue-final-modal v-model="showModal">
      Modal Content Here
    </vue-final-modal>
    <button @click="showModal = true">
      Open Modal
    </button> -->
    <master-modal />
  </div>
</template>
<script>
// import Vue from 'vue'
import 'oton-vue-components'
import 'oton-vue-components/dist/oton-vue-lib.css'
import { mapGetters } from 'vuex'
import CreateNode from '@/components/CreateNode.vue'
import NodeItem from '@/components/NodeItem.vue'
import MasterModal from '~/components/MasterModal.vue'
import CommonLoader from '@/components/CommonLoader.vue'

export default {
  name: 'IndexPage',
  components: {
    CreateNode,
    NodeItem,
    MasterModal,
    CommonLoader
  },
  layout: 'default',
  middleware: 'isAuth',
  data () {
    return {
      emptyState: true,
      showModal: false
    }
  },
  computed: {
    ...mapGetters({
      nodesList: 'nodesStore/nodesList',
      fetchState: 'nodesStore/fetchState'
    })
  },
  mounted () {
    this.$store.dispatch('nodesStore/fetch')
  },
  methods: {
    startMaster () {
      this.$store.commit('modalStore/changeCurrentModal', 'MasterModal')
      // console.log(this.$vfm)
      // this.$vfm.show('Step1')
    }
  }
}
</script>

<style lang="stylus" scoped>
.page {
  position: relative;
}
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 140px;
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

::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep .vfm__container {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  width: 100%;
  max-width: 640px;
  margin: 0 1rem;
  // padding: 1rem;
  border: none;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
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
