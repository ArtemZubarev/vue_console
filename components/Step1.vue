<template>
  <master-layout>
    <template #header>
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/CUfGX90c39c?controls=0"
        title=""
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </template>
    <template #title>
      {{ $t('Step 1') }}
    </template>
    <template #main>
      <common-button :filled="true" :text="$t('Ок, I did this')" @click="$emit('next')" />
    </template>
  </master-layout>
</template>

<script>
import CommonButton from './CommonButton.vue'
import MasterLayout from './MasterLayout.vue'

export default {
  components: {
    MasterLayout,
    CommonButton
  },
  props: {

  }
}
</script>

<style lang="stylus" scoped>

</style>
