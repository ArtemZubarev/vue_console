<template>
  <common-modal
    :name="name"
    :clickToClose="currentStep == '106' || currentStep == '207' ? false : true"
    @next="nextStep"
  >
    <div class="progress" :style="{width: progressWidth}" />
    <step-contract v-if="currentStep == '1'" @next="nextStep" />
    <step-name v-if="currentStep == '2'" @next="nextStep" @previous="previousStep" />
    <step-address v-if="currentStep == '3'" @next="nextStep" @previous="previousStep" />
    <step-provider v-if="currentStep == '4'" @next="nextStep" @previous="previousStep" />

    <step-token v-if="currentStep == '105'" @next="nextStep" @previous="previousStep" />

    <step-script v-if="currentStep == '205'" @next="nextStep" @previous="previousStep" />
    <step-ip-address v-if="currentStep == '206'" @next="nextStep" @previous="previousStep" />

    <step-done v-if="currentStep == '106' || currentStep == '207'" @next="nextStep" />
  </common-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import StepScript from './StepScript.vue'
import StepIpAddress from '~/components/StepIpAddress.vue'
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
    StepDone,
    StepIpAddress,
    StepScript
  },
  data () {
    return {
      name: 'MasterModal',
      steps: [1, 2, 3, 4, 105, 205, 206],
      timeout: null,
      currentStatus: null
    }
  },
  computed: {
    ...mapGetters({
      currentStep: 'masterStore/step',
      provider: 'masterStore/provider'
    }),
    progressWidth () {
      let step = Number(this.currentStep)
      let length = 6
      if (step > 100 && step < 200) {
        step = step - 100
        length = 5
      } else if (step > 200) {
        step = step - 200
      }

      return `${100 / length * step}%`
    }
  },
  methods: {
    previousStep () {
      let prevOne = Number(this.currentStep) - 1
      if (this.currentStep === 105) {
        prevOne = prevOne - 100
      }
      if (this.currentStep === 205) {
        prevOne = prevOne - 200
      }
      this.$store.commit('masterStore/SET_STEP', prevOne)
    },
    finishMaster (nextOne) {
      console.info('DEV - finish func')
      this.$store.commit('masterStore/SET_STEP', nextOne)
      this.$store.dispatch('nodesStore/fetch')
      const token = this.$cookies.get('auth')
      this.$store.dispatch('userStore/fetchUser', token)
      this.$store.commit('masterStore/CLEAR_WITHOUT_STEP_CHANGING')
      console.info('DEV - should be cleared')
    },
    nextStep () {
      let nextOne = Number(this.currentStep) + 1
      if (this.currentStep === 4 && this.provider === 'other') {
        nextOne = nextOne + 200
      }
      if (this.currentStep === 4 && this.provider === 'DO') {
        nextOne = nextOne + 100
      }
      if (Number(this.currentStep) === 105) {
        Promise.resolve(this.$store.dispatch('masterStore/createNode')).then((res) => {
          if (res) {
            console.log(res)
            this.finishMaster(nextOne)
          }
        })
      } else if (Number(this.currentStep) === 206) {
        Promise.resolve(this.$store.dispatch('masterStore/createNodeCustom')).then((res) => {
          if (res) {
            console.log(res)
            this.finishMaster(nextOne)
          }
        })
      } else if (Number(this.currentStep) === 106 || Number(this.currentStep) === 207) {
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
