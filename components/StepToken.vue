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
      <div class="main">
        <with-loader :active="fetchState === 'PENDING'" :withBackground="true">
          <master-input :label="'DO Token'" :value="token" @change-value="handleToken" />
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
import MasterInput from './MasterInput.vue'
import WithLoader from './WithLoader.vue'

export default {
  components: {
    MasterLayout,
    CommonButton,
    MasterInput,
    WithLoader
  },
  computed: {
    ...mapGetters({
      fetchState: 'masterStore/fetchState',
      token: 'masterStore/token'
    })
  },
  mounted () {
    this.$store.dispatch('masterStore/checkToken')
  },
  methods: {
    handleToken (value) {
      this.$store.commit('masterStore/UPDATE_TOKEN', value)
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
.button {
  margin: 0 auto;
  margin-top: 18px;
  display: block;
}
</style>
