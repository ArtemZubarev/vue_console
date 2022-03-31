<template>
  <common-modal
    :name="name"
  >
    <div class="modal">
      <div class="modal__title">
        {{ $t('Are you sure?') }}
      </div>
      <div class="modal__buttons">
        <common-button :text="$t('No')" @click="close" />
        <common-button :filled="true" :text="$t('Confirm')" @click="$emit('confirm')" />
      </div>
    </div>
  </common-modal>
</template>

<script>
import CommonButton from './CommonButton.vue'
export default {
  components: {
    CommonButton
  },
  data () {
    return {
      name: 'ConfirmModal'
    }
  },
  methods: {
    close () {
      this.$store.commit('modalStore/closeModal')
    }
  }
}
</script>
<style lang="stylus" scoped>
.progress {
  position: absolute;
  left: 0;
  top: 0;
  background: #7DC475;
  height: 8px;
  transition: 0.4s;
}
.back {
  margin-bottom: 10px;
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

::v-deep .vfm__overlay {
  background: rgba(49, 123, 146, 0.6);
}

::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  width: 100%;
  max-width: 240px;
  margin: 0 1rem;
  // padding: 1rem;
  border: none;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
}
.modal__title {
  // margin: 0 2rem 0 0;
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
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;

  &__title {
    margin-bottom: 10px;
  }
}
</style>
