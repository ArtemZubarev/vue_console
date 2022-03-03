<template>
  <common-modal :name="name">
    <step-1 v-if="currentStep === 1" @next="nextStep" />
    <step-2 v-if="currentStep === 2" @next="nextStep" />
    <div class="progress" :style="{width: progressWidth}" />
  </common-modal>
</template>

<script>
import CommonModal from '@/components/CommonModal.vue'
import Step1 from '@/components/Step1.vue'

export default {
  components: { CommonModal, Step1 },
  data () {
    return {
      name: 'MasterModal',
      currentStep: 1,
      steps: [1, 2]
    }
  },
  computed: {
    progressWidth () {
      return `${100 / this.steps.length * this.currentStep}%`
    }
  },
  methods: {
    nextStep () {
      if (this.currentStep === this.steps.length) {
        this.currentStep = 1
        this.$store.commit('modalStore/closeModal')
      } else {
        this.currentStep = ++this.currentStep
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
</style>
