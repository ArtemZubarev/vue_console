<template>
  <div class="step">
    <h2 class="step__title">
      {{ $t('Step 3') }}
    </h2>
    <p>{{ $t('Just wait a few minutes') }}</p>

    <div class="progressbar">
      <div :class="['progressbar__line']" :style="{width: `${(100 / 12) * (status ? Number(status) + 2 : 1)}%`}" />
    </div>
    <p class="step__status">
      {{ statusText ? statusText : 'Preparing...' }}
    </p>
  </div>
</template>
<script>
import nodeStatuses from '@/utils/nodeStatuses'

export default {
  props: {
    status: {
      type: [String, Number],
      required: false
    }
  },
  data () {
    return {
      statuses: nodeStatuses
    }
  },
  computed: {
    statusText () {
      return this.statuses[this.status]
    }
  }
}
</script>
<style lang="stylus" scoped>
.step {
  padding: 8px 32px 80px 32px;

  &__status {
    opacity: 0.4;
    font-size: 14px;
  }
}
.progressbar {
  position: relative;
  overflow: hidden;
  background: #F7F5EE 0% 0% no-repeat padding-box;
  height: 16px;
  border-radius: 4px;

  &__line {
    position: absolute;
    background: transparent linear-gradient(180deg, #7DC475 0%, #4E9A45 100%) 0% 0% no-repeat padding-box;
    transition: 3s;
    height: 100%;
  }
}
</style>
