<template>
  <common-modal :name="name" :clickToClose="currentStep !== 3 ? true : false">
    <step-1 v-if="currentStep == '1'" @next="nextStep" />
    <step-2 v-if="currentStep == '2'" @next="nextStep" />
    <step-3 v-if="currentStep == '3'" @next="nextStep" />
    <step-progress v-if="currentStep == '4'" :status="currentStatus" @next="nextStep" />
    <div class="progress" :style="{width: progressWidth}" />
  </common-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import CommonModal from '@/components/CommonModal.vue'
import Step1 from '@/components/Step1.vue'
import Step2 from '@/components/Step2.vue'
import Step3 from '@/components/Step3.vue'
import StepProgress from '~/components/StepProgress.vue'

export default {
  components: {
    CommonModal,
    Step1,
    Step2,
    Step3,
    StepProgress
  },
  data () {
    return {
      name: 'MasterModal',
      steps: [1, 2, 3, 4],
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
    nextStep () {
      this.$store.commit('masterStore/SET_STEP', Number(this.currentStep) + 1)

      if (this.currentStep === this.steps.length) {
        Promise.all([this.$store.dispatch('masterStore/createNode')]).then((res) => {
          if (res[0]) {
            this.timeout = setInterval(() => {
              Promise.all([this.$store.dispatch('masterStore/checkStatus', res[0])]).then((res) => {
                this.currentStatus = res[0]
                if (res[0] === '3') {
                  this.$emit('done')
                  clearInterval(this.timeout)
                  this.$store.dispatch('nodesStore/fetch')
                  this.$store.commit('modalStore/closeModal')
                }
              })
            }, 10000)
          }
        })
      }
    }
  }

}
</script>
<style lang="stylus" scoped>
.progress {
  position: absolute;
  left: 0;
  bottom: 0;
  background: #7DC475;
  height: 8px;
  transition: 0.4s;
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
