<template>
  <vue-final-modal
    v-if="isOpen"
    v-model="isOpen"
    :maxWidth="width"
    contentClass="modal-content"
    @cancel="closeHandler"
    @click-outside="closeHandler"
  >
    <div class="header">
      <div v-if="title" class="title">
        {{ title }}
      </div>
    </div>

    <div class="body">
      <slot />
    </div>
  </vue-final-modal>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    visible: Boolean,
    name: {
      type: String,
      required: false,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 600
    },
    clickToClose: {
      type: Boolean,
      reuired: false
    }
  },
  computed: {
    ...mapGetters({
      currentOpen: 'modalStore/currentOpen'
    }),
    isOpen: {
      get () {
        return this.name === this.currentOpen
      },
      set () {
        return ''
      }
    }
  },
  methods: {
    closeHandler () {
      if (typeof this.name === 'string') {
        if (this.clickToClose) {
          this.$store.commit('modalStore/closeModal')
        }
      }
    }

  }

}
</script>

<style lang="stylus" scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
