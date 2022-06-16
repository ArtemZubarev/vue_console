<template>
  <master-layout
    :nextText="'Next'"
    :next="false"
    :prev="false"
    :footer="false"
    @next="$emit('next')"
    @previous="$emit('previous')"
  >
    <template #title>
      {{ $t('Congratulations!') }}
    </template>
    <template #main>
      <div class="main">
        <div class="main__text">
          {{ $t('Node will be created in a while.') }}
        </div>
        <common-button class="button" :filled="false" :text="$t('Ok')" @click="$emit('next')" />
        <!-- <with-loader :active="fetchState === 'PENDING'" :withBackground="true">
          <master-input :label="'Node name'" :value="name" @change-value="handleName" />
        </with-loader> -->
      </div>
    </template>
  </master-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import MasterLayout from './MasterLayout.vue'
import CommonButton from '@/components/CommonButton.vue'

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
      name: 'masterStore/name'
    })
  },
  methods: {
    handleName (value) {
      this.$store.commit('masterStore/UPDATE_NAME', value)
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

  &__text {
    text-align: center;
    margin-bottom: 8px;
    color: $colorFontBase;
  }
}
.button {
  margin: 0 auto;
  margin-top: 18px;
  display: block;
}
</style>
