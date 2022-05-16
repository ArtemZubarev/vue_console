<template>
  <common-modal
    :name="name"
    :clickToClose="currentStep !== '5' ? true : false"
    @next="nextStep"
  >
    <div class="progress" :style="{width: progressWidth}" />
    <step-contract v-if="currentStep == '1'" @next="nextStep" />
    <step-token v-if="currentStep == '2'" @next="nextStep" @previous="previousStep" />
    <step-address v-if="currentStep == '3'" @next="nextStep" @previous="previousStep" />
    <step-name v-if="currentStep == '4'" @next="nextStep" @previous="previousStep" />
    <step-done v-if="currentStep == '5'" @next="nextStep" />
  </common-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import CommonModal from '@/components/CommonModal.vue'
import StepToken from '~/components/StepToken.vue'
import StepAddress from '~/components/StepAddress.vue'
import StepName from '~/components/StepName.vue'
import StepDone from '~/components/StepDone.vue'

export default {
  components: {
    CommonModal,
    StepToken,
    StepAddress,
    StepName,
    StepDone
  },
  data () {
    return {
      name: 'MasterModal',
      steps: [1, 2, 3, 4, 5],
      timeout: null,
      currentStatus: null
    }
  },
  computed: {
    ...mapGetters({
      currentStep: 'masterStore/step'
    }),
    progressWidth () {
      return `${100 / this.steps.length * this.currentStep}%`
    }
  },
  methods: {
    previousStep () {
      this.$store.commit('masterStore/SET_STEP', Number(this.currentStep) - 1)
    },
    nextStep () {
      const nextOne = Number(this.currentStep) + 1
      if (Number(this.currentStep) === this.steps.length - 1) {
        Promise.resolve(this.$store.dispatch('masterStore/createNode')).then((res) => {
          if (res) {
            this.$store.commit('masterStore/SET_STEP', nextOne)
            this.$store.dispatch('nodesStore/fetch')
            const token = this.$cookies.get('auth')
            this.$store.dispatch('userStore/fetchUser', token)
            this.$store.commit('masterStore/CLEAR')
          }
        })
      } else if (Number(this.currentStep) === this.steps.length) {
        this.$store.commit('modalStore/closeModal')
        this.$store.commit('masterStore/SET_STEP', 1)
        this.$store.commit('checkStore/CLEAR')
      } else {
        this.$store.commit('masterStore/SET_STEP', nextOne)
      }
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
</style>
