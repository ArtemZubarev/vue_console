<template>
  <div class="box">
    <div
      v-for="(phrase, index) in phrases"
      :key="phrase"
      class="box__item"
      :style="{ opacity: 1 - index * 0.2 }"
    >
      <span>{{ phrase }}</span>
    </div>
  </div>
</template>

<script>
import techWorks from '@/utils/techWorks'

export default {
  layout: 'maintainer',
  data () {
    return {
      phrases: [
        'Technical works. Come back later',
        'Технические работы. Зайдите попозже',
        'Technische Arbeiten. Später wiederkommen',
        'Teknik işler. Daha sonra gel'
      ]
    }
  },
  mounted () {
    if (!techWorks) {
      this.$router.push(this.localePath('/'))
    }
  }
}
</script>

<style>
.box {
  margin-top: 60px;
}
.box__item {
  font-weight: bold;
}
</style>
