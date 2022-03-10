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
      {{ $t('Step 2') }}
    </template>
    <template #main>
      <div class="main">
        <with-loader :active="fetchState === 'PENDING'" :withBackground="true">
          <master-input :label="'Wallet address'" :value="address" @change-value="handleAddress" />
          <common-button class="button" :filled="true" :text="$t('Ок, I did this')" @click="$emit('next')" />
        </with-loader>
      </div>
    </template>
  </master-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import CommonButton from './CommonButton.vue'
import MasterLayout from './MasterLayout.vue'

export default {
  components: {
    MasterLayout,
    CommonButton
  },
  props: {

  },
  computed: {
    ...mapGetters({
      fetchState: 'masterStore/fetchState',
      address: 'masterStore/address'
    })
  },
  methods: {
    handleAddress (value) {
      this.$store.commit('masterStore/UPDATE_ADDRESS', value)
    }
  }

}
</script>

<style lang="stylus" scoped>
.main {
  position: relative;
  display: inline-block;
  margin: 0 auto;
  width: 100%;
  max-width: 353px;
}
.button {
  margin: 0 auto;
  margin-top: 18px;
  display: block;
}
</style>
